import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { GlobalFilterValue } from '../components/dashboard/GlobalFilters';

export type DashboardFilters = GlobalFilterValue;

export const DEFAULT_DASHBOARD_FILTERS: DashboardFilters = {
  month: 'all',
  zone: 'all',
  technology: 'all',
  packageType: 'all'
};

const TECHNOLOGY_LABELS: Record<string, string> = {
  gpon: 'GPON',
  hfc: 'HFC',
  dth: 'DTH',
  wttx: 'WTTx'
};

const PACKAGE_LABELS: Record<string, string> = {
  oneplay: 'OnePlay',
  doubleplay: 'DoublePlay',
  tripleplay: 'TriplePlay',
  full: 'Full'
};

type VentaRecord = {
  id: string;
  vendedor_id: string;
  aliado_id: string | null;
  cliente_id: string;
  mes_reporte: string | null;
  tipo_paquete: string;
  tecnologia: string;
  estado: 'pendiente' | 'instalada' | 'fallida';
  fecha_contratacion: string | null;
  fecha_instalacion: string | null;
  monto: number | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type VendedorRecord = {
  id: string;
  nombre: string;
  zona: string | null;
  estado: string;
};

type MetaRecord = {
  id: string;
  vendedor_id: string;
  mes: string;
  servicios_meta: number | null;
  servicios_logrados: number | null;
};

type AliadoRecord = {
  id: string;
  nombre: string;
  total_referidos: number | null;
  total_instalados: number | null;
};

type RawDashboardData = {
  ventas: VentaRecord[];
  vendedores: VendedorRecord[];
  metas: MetaRecord[];
  aliados: AliadoRecord[];
};

type FilterOption = {
  label: string;
  value: string;
};

type DashboardKpis = {
  totalIngresadas: number;
  totalInstaladas: number;
  tasaExito: number;
  ultimaVenta: string | null;
  ultimaActualizacion: string | null;
  cumplimientoGlobal: number;
};

type TopVendor = {
  id: string;
  nombre: string;
  zona: string | null;
  totalInstaladas: number;
};

type ChartPoint = {
  name: string;
  ventas: number;
};

type TechnologyPoint = {
  name: string;
  value: number;
};

type MonthlyComparisonPoint = {
  mes: string;
  ingresadas: number;
  instaladas: number;
};

type PackageDistribution = {
  name: string;
  value: number;
  percentage: number;
};

type ReferidosSummary = {
  totalReferidos: number;
  instaladosPorReferidos: number;
  porcentajeInstalados: number;
  metaReferidos: number;
};

type ComparisonSummary = {
  currentLabel: string;
  previousLabel: string | null;
  delta: number | null;
  currentInstaladas: number;
  previousInstaladas: number | null;
};

type DashboardComputed = {
  kpis: DashboardKpis;
  topVendors: TopVendor[];
  salesByZone: ChartPoint[];
  salesByTechnology: TechnologyPoint[];
  salesByPackage: PackageDistribution[];
  monthlyComparison: MonthlyComparisonPoint[];
  referidos: ReferidosSummary;
  comparison: ComparisonSummary;
  filterOptions: {
    months: FilterOption[];
    zones: FilterOption[];
    technologies: FilterOption[];
    packages: FilterOption[];
  };
};

type UseDashboardDataResult = {
  loading: boolean;
  error: string | null;
  data: DashboardComputed | null;
  lastRefresh: string | null;
  refetch: () => Promise<void>;
};

const formatMonthLabel = (value: string) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat('es-HN', { month: 'long', year: 'numeric' }).format(date);
};

const getMonthKey = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const getMonthLabelFromKey = (key: string) => {
  const [year, month] = key.split('-').map(Number);
  const date = new Date(year, (month ?? 1) - 1, 1);
  return new Intl.DateTimeFormat('es-HN', { month: 'long', year: 'numeric' }).format(date);
};

const buildFilterOptions = (raw: RawDashboardData): DashboardComputed['filterOptions'] => {
  const monthSet = new Set<string>();
  raw.ventas.forEach((venta) => {
    const key = getMonthKey(venta.mes_reporte ?? venta.fecha_contratacion ?? '');
    if (key) {
      monthSet.add(key);
    }
  });

  const months: FilterOption[] = [
    { label: 'Todos los meses', value: 'all' },
    ...Array.from(monthSet)
      .sort()
      .map((key) => ({ label: getMonthLabelFromKey(key), value: key }))
  ];

  const zoneSet = new Set<string>();
  raw.vendedores.forEach((vendor) => {
    if (vendor.zona) {
      zoneSet.add(vendor.zona);
    }
  });

  const zones: FilterOption[] = [
    { label: 'Todas las zonas', value: 'all' },
    ...Array.from(zoneSet)
      .sort((a, b) => a.localeCompare(b, 'es'))
      .map((zone) => ({ label: zone, value: zone }))
  ];

  const technologies: FilterOption[] = [
    { label: 'Todas las tecnologías', value: 'all' },
    ...Object.entries(TECHNOLOGY_LABELS).map(([value, label]) => ({ label, value }))
  ];

  const packages: FilterOption[] = [
    { label: 'Todos los paquetes', value: 'all' },
    ...Object.entries(PACKAGE_LABELS).map(([value, label]) => ({ label, value }))
  ];

  return { months, zones, technologies, packages };
};

const applyFilters = (raw: RawDashboardData, filters: DashboardFilters) => {
  const vendorMap = new Map(raw.vendedores.map((vendor) => [vendor.id, vendor]));

  const matchesFilters = (venta: VentaRecord) => {
    const monthKey = getMonthKey(venta.mes_reporte ?? venta.fecha_contratacion ?? null);
    if (filters.month !== 'all' && monthKey !== filters.month) return false;

    if (filters.technology !== 'all' && (venta.tecnologia ?? '').toLowerCase() !== filters.technology) return false;

    if (filters.packageType !== 'all' && (venta.tipo_paquete ?? '').toLowerCase() !== filters.packageType) return false;

    if (filters.zone !== 'all') {
      const vendor = vendorMap.get(venta.vendedor_id);
      if (!vendor || vendor.zona !== filters.zone) return false;
    }

    return true;
  };

  return raw.ventas.filter(matchesFilters);
};

const buildKpis = (
  raw: RawDashboardData,
  filteredVentas: VentaRecord[],
  filters: DashboardFilters
): DashboardKpis => {
  const totalIngresadas = filteredVentas.length;
  const instaladas = filteredVentas.filter((venta) => venta.estado === 'instalada');
  const totalInstaladas = instaladas.length;
  const tasaExito = totalIngresadas ? (totalInstaladas / totalIngresadas) * 100 : 0;

  const latestSale = instaladas
    .map((venta) => venta.fecha_instalacion ?? venta.fecha_contratacion)
    .filter(Boolean)
    .sort((a, b) => new Date(b ?? '').getTime() - new Date(a ?? '').getTime())[0] ?? null;

  const latestUpdate = raw.ventas
    .map((venta) => venta.updated_at ?? venta.created_at)
    .filter(Boolean)
    .sort((a, b) => new Date(b ?? '').getTime() - new Date(a ?? '').getTime())[0] ?? null;

  const vendorMap = new Map(raw.vendedores.map((vendor) => [vendor.id, vendor]));

  const metasFiltradas = raw.metas.filter((meta) => {
    if (!meta.mes) return false;
    const monthKey = getMonthKey(meta.mes);
    if (filters.month !== 'all' && monthKey !== filters.month) return false;

    if (filters.zone !== 'all') {
      const vendor = vendorMap.get(meta.vendedor_id);
      if (!vendor || vendor.zona !== filters.zone) return false;
    }

    return true;
  });

  const totalMeta = metasFiltradas.reduce((acc, meta) => acc + (meta.servicios_meta ?? 0), 0);
  const totalLogrados = metasFiltradas.reduce((acc, meta) => acc + (meta.servicios_logrados ?? 0), 0);
  const cumplimientoGlobal = totalMeta ? (totalLogrados / totalMeta) * 100 : 0;

  return {
    totalIngresadas,
    totalInstaladas,
    tasaExito,
    ultimaVenta: latestSale,
    ultimaActualizacion: latestUpdate,
    cumplimientoGlobal
  };
};

const buildTopVendors = (raw: RawDashboardData, ventas: VentaRecord[]): TopVendor[] => {
  const vendorMap = new Map(raw.vendedores.map((vendor) => [vendor.id, vendor]));

  const installedByVendor = ventas
    .filter((venta) => venta.estado === 'instalada')
    .reduce<Record<string, number>>((acc, venta) => {
      acc[venta.vendedor_id] = (acc[venta.vendedor_id] ?? 0) + 1;
      return acc;
    }, {});

  return Object.entries(installedByVendor)
    .map(([vendorId, totalInstaladas]) => {
      const vendor = vendorMap.get(vendorId);
      return {
        id: vendorId,
        nombre: vendor?.nombre ?? 'Vendedor sin nombre',
        zona: vendor?.zona ?? null,
        totalInstaladas
      };
    })
    .sort((a, b) => b.totalInstaladas - a.totalInstaladas)
    .slice(0, 10);
};

const buildSalesByZone = (raw: RawDashboardData, ventas: VentaRecord[]): ChartPoint[] => {
  const vendorMap = new Map(raw.vendedores.map((vendor) => [vendor.id, vendor]));
  const grouped = ventas.reduce<Record<string, number>>((acc, venta) => {
    const vendor = vendorMap.get(venta.vendedor_id);
    const zone = vendor?.zona ?? 'Sin zona';
    acc[zone] = (acc[zone] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([name, ventas]) => ({ name, ventas }))
    .sort((a, b) => b.ventas - a.ventas);
};

const buildSalesByTechnology = (ventas: VentaRecord[]): TechnologyPoint[] => {
  const grouped = ventas.reduce<Record<string, number>>((acc, venta) => {
    const key = (venta.tecnologia ?? '').toLowerCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([key, value]) => ({ name: TECHNOLOGY_LABELS[key] ?? key.toUpperCase(), value }))
    .sort((a, b) => b.value - a.value);
};

const buildSalesByPackage = (ventas: VentaRecord[]): PackageDistribution[] => {
  const grouped = ventas.reduce<Record<string, number>>((acc, venta) => {
    const key = (venta.tipo_paquete ?? '').toLowerCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const total = Object.values(grouped).reduce((acc, value) => acc + value, 0);

  return Object.entries(grouped)
    .map(([key, value]) => ({
      name: PACKAGE_LABELS[key] ?? key.toUpperCase(),
      value,
      percentage: total ? (value / total) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value);
};

const buildMonthlyComparison = (
  raw: RawDashboardData,
  filters: DashboardFilters
): { points: MonthlyComparisonPoint[]; summary: ComparisonSummary } => {
  const vendorMap = new Map(raw.vendedores.map((vendor) => [vendor.id, vendor]));
  const matchesOtherFilters = (venta: VentaRecord) => {
    if (filters.technology !== 'all' && venta.tecnologia !== filters.technology) return false;
    if (filters.packageType !== 'all' && venta.tipo_paquete !== filters.packageType) return false;
    if (filters.zone !== 'all') {
      const vendor = vendorMap.get(venta.vendedor_id);
      if (!vendor || vendor.zona !== filters.zone) return false;
    }
    return true;
  };

  const ventas = raw.ventas.filter(matchesOtherFilters);

  const grouped = ventas.reduce<Record<string, { ingresadas: number; instaladas: number }>>((acc, venta) => {
    const key = getMonthKey(venta.mes_reporte ?? venta.fecha_contratacion ?? null);
    if (!key) return acc;
    if (!acc[key]) {
      acc[key] = { ingresadas: 0, instaladas: 0 };
    }
    acc[key].ingresadas += 1;
    if (venta.estado === 'instalada') {
      acc[key].instaladas += 1;
    }
    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort();
  const limitedKeys = filters.month !== 'all' ? sortedKeys.filter((key) => key === filters.month || key < filters.month) : sortedKeys;
  const lastKeys = limitedKeys.slice(-6);

  const points = lastKeys.map((key) => ({
    mes: getMonthLabelFromKey(key),
    ingresadas: grouped[key].ingresadas,
    instaladas: grouped[key].instaladas
  }));

  const currentKey = lastKeys[lastKeys.length - 1] ?? null;
  const previousKey = lastKeys.length > 1 ? lastKeys[lastKeys.length - 2] : null;

  const currentInstaladas = currentKey ? grouped[currentKey].instaladas : 0;
  const previousInstaladas = previousKey ? grouped[previousKey].instaladas : null;
  const delta = previousInstaladas ? ((currentInstaladas - previousInstaladas) / previousInstaladas) * 100 : null;

  return {
    points,
    summary: {
      currentLabel: currentKey ? getMonthLabelFromKey(currentKey) : 'Sin datos',
      previousLabel: previousKey ? getMonthLabelFromKey(previousKey) : null,
      delta,
      currentInstaladas,
      previousInstaladas
    }
  };
};

const buildReferidosSummary = (ventas: VentaRecord[], aliados: AliadoRecord[]): ReferidosSummary => {
  const referidos = ventas.filter((venta) => Boolean(venta.aliado_id));
  const instalados = referidos.filter((venta) => venta.estado === 'instalada');
  const metaReferidos = aliados.reduce((acc, aliado) => acc + (aliado.total_referidos ?? 0), 0);
  const totalReferidos = referidos.length;
  const instaladosPorReferidos = instalados.length;
  const porcentajeInstalados = totalReferidos ? (instaladosPorReferidos / totalReferidos) * 100 : 0;

  return {
    totalReferidos,
    instaladosPorReferidos,
    porcentajeInstalados,
    metaReferidos
  };
};

const computeDashboard = (raw: RawDashboardData, filters: DashboardFilters): DashboardComputed => {
  const filteredVentas = applyFilters(raw, filters);

  const kpis = buildKpis(raw, filteredVentas, filters);
  const topVendors = buildTopVendors(raw, filteredVentas);
  const salesByZone = buildSalesByZone(raw, filteredVentas);
  const salesByTechnology = buildSalesByTechnology(filteredVentas);
  const salesByPackage = buildSalesByPackage(filteredVentas);
  const { points: monthlyComparison, summary: comparison } = buildMonthlyComparison(raw, filters);
  const referidos = buildReferidosSummary(filteredVentas, raw.aliados);
  const filterOptions = buildFilterOptions(raw);

  return {
    kpis,
    topVendors,
    salesByZone,
    salesByTechnology,
    salesByPackage,
    monthlyComparison,
    referidos,
    comparison,
    filterOptions
  };
};

export const useDashboardData = (filters: DashboardFilters): UseDashboardDataResult => {
  const [rawData, setRawData] = useState<RawDashboardData>({ ventas: [], vendedores: [], metas: [], aliados: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ventasRes, vendedoresRes, metasRes, aliadosRes] = await Promise.all([
        supabase
          .from('ventas')
          .select(
            'id, vendedor_id, aliado_id, cliente_id, mes_reporte, tipo_paquete, tecnologia, estado, fecha_contratacion, fecha_instalacion, monto, created_at, updated_at'
          ),
        supabase.from('vendedores').select('id, nombre, zona, estado'),
        supabase.from('metas').select('id, vendedor_id, mes, servicios_meta, servicios_logrados'),
        supabase.from('aliados').select('id, nombre, total_referidos, total_instalados')
      ]);

      if (ventasRes.error) throw ventasRes.error;
      if (vendedoresRes.error) throw vendedoresRes.error;
      if (metasRes.error) throw metasRes.error;
      if (aliadosRes.error) throw aliadosRes.error;

      setRawData({
        ventas: ventasRes.data ?? [],
        vendedores: vendedoresRes.data ?? [],
        metas: metasRes.data ?? [],
        aliados: aliadosRes.data ?? []
      });
      setLastRefresh(new Date().toISOString());
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const computed = useMemo(() => {
    if (!rawData) return null;
    return computeDashboard(rawData, filters);
  }, [rawData, filters]);

  return {
    loading,
    error,
    data: computed,
    lastRefresh,
    refetch: fetchData
  };
};
