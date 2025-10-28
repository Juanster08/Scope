import { Activity, ArrowUpRight, BadgePercent, Clock, RefreshCcw, TrendingUp } from 'lucide-react';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { GlobalFilters } from '../../components/dashboard/GlobalFilters';
import { TopVendorsList } from '../../components/dashboard/TopVendorsList';
import { SalesByZoneChart } from '../../components/charts/SalesByZoneChart';
import { SalesByTechnologyChart } from '../../components/charts/SalesByTechnologyChart';
import { MonthlyComparisonChart } from '../../components/charts/MonthlyComparisonChart';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  DEFAULT_DASHBOARD_FILTERS,
  useDashboardData
} from '../../hooks/useDashboardData';
import { useState } from 'react';
import { GlobalFilterValue } from '../../components/dashboard/GlobalFilters';

const icons = [Activity, TrendingUp, BadgePercent, Clock];

const DashboardPage = () => {
  const [filters, setFilters] = useState<GlobalFilterValue>(DEFAULT_DASHBOARD_FILTERS);
  const { data, loading, error, lastRefresh, refetch } = useDashboardData(filters);

  const kpis = data?.kpis;
  const formattedLastSale = kpis?.ultimaVenta
    ? new Intl.DateTimeFormat('es-HN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(kpis.ultimaVenta))
    : 'Sin registros recientes';
  const formattedLastUpdate = kpis?.ultimaActualizacion
    ? new Intl.DateTimeFormat('es-HN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(kpis.ultimaActualizacion))
    : 'Sincronización pendiente';
  const comparison = data?.comparison;
  const referidos = data?.referidos;
  const packages = data?.salesByPackage ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <GlobalFilters
            value={filters}
            onChange={setFilters}
            options={{
              months: data?.filterOptions.months ?? [{ label: 'Todos los meses', value: 'all' }],
              zones: data?.filterOptions.zones ?? [{ label: 'Todas las zonas', value: 'all' }],
              technologies: data?.filterOptions.technologies ?? [
                { label: 'Todas las tecnologías', value: 'all' }
              ],
              packages: data?.filterOptions.packages ?? [{ label: 'Todos los paquetes', value: 'all' }]
            }}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-slate-300">Última actualización</span>
          <span className="text-sm text-white">
            {lastRefresh
              ? new Intl.DateTimeFormat('es-HN', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }).format(new Date(lastRefresh))
              : 'Sincronizando datos...'}
          </span>
          <Button onClick={refetch} variant="ghost" className="mt-1 inline-flex items-center gap-2 text-xs" disabled={loading}>
            <RefreshCcw className="h-3.5 w-3.5" /> Recargar datos
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          Ocurrió un error al cargar los datos del dashboard: {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis
          ? [
              {
                label: 'Ventas ingresadas',
                value: kpis.totalIngresadas.toLocaleString('es-HN'),
                delta: `Última venta: ${formattedLastSale}`
              },
              {
                label: 'Ventas instaladas',
                value: kpis.totalInstaladas.toLocaleString('es-HN'),
                delta: `Última actualización: ${formattedLastUpdate}`
              },
              {
                label: 'Tasa de éxito',
                value: `${kpis.tasaExito.toFixed(1)}%`,
                delta: `${kpis.totalInstaladas.toLocaleString('es-HN')} de ${kpis.totalIngresadas.toLocaleString('es-HN')}`
              },
              {
                label: 'Cumplimiento global',
                value: `${kpis.cumplimientoGlobal.toFixed(1)}%`,
                delta: 'Promedio de metas activas'
              }
            ].map((kpi, index) => {
              const Icon = icons[index % icons.length];
              return (
                <KpiCard
                  key={kpi.label}
                  title={kpi.label}
                  value={kpi.value}
                  delta={kpi.delta ?? undefined}
                  icon={<Icon className="h-5 w-5 text-ism-light" />}
                />
              );
            })
          : Array.from({ length: 4 }).map((_, index) => (
              <div key={`kpi-skeleton-${index}`} className="h-32 animate-pulse rounded-2xl bg-slate-900/40" />
            ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Ranking de vendedores"
          description="Top 10 por ventas instaladas"
          className="lg:col-span-1"
        >
          <TopVendorsList vendors={data?.topVendors ?? []} isLoading={loading} />
        </Card>
        <Card title="Ventas por zonas" className="lg:col-span-2">
          <SalesByZoneChart data={data?.salesByZone ?? []} isLoading={loading} />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Ventas por tecnología" className="lg:col-span-1">
          <SalesByTechnologyChart data={data?.salesByTechnology ?? []} isLoading={loading} />
        </Card>
        <Card title="Comparativo mensual" description="Ingresadas vs instaladas" className="lg:col-span-2">
          <MonthlyComparisonChart data={data?.monthlyComparison ?? []} isLoading={loading} />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Ventas por tipo de paquete" description="Distribución porcentual">
          {loading ? (
            <div className="h-32 animate-pulse rounded-xl bg-slate-900/40" />
          ) : packages.length ? (
            <ul className="space-y-3 text-sm text-slate-300">
              {packages.map((item) => (
                <li key={item.name} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="font-semibold text-white">
                    {item.value.toLocaleString('es-HN')} ventas ({item.percentage.toFixed(1)}%)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No hay información para mostrar la distribución de paquetes.</p>
          )}
        </Card>
        <Card title="Referidos del mes" description="Alianzas estratégicas">
          {loading || !referidos ? (
            <div className="h-32 animate-pulse rounded-xl bg-slate-900/40" />
          ) : (
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Total referidos</span>
                <span className="font-semibold text-white">{referidos.totalReferidos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Instalados por referidos</span>
                <span className="font-semibold text-white">
                  {referidos.instaladosPorReferidos} ({referidos.porcentajeInstalados.toFixed(1)}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Meta mensual de referidos</span>
                <span className="font-semibold text-white">{referidos.metaReferidos}</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card title="Mes actual vs anterior" description="Variación porcentual">
        {loading || !comparison ? (
          <div className="h-24 animate-pulse rounded-xl bg-slate-900/40" />
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {comparison.previousLabel
                  ? `${comparison.currentLabel} vs ${comparison.previousLabel}`
                  : comparison.currentLabel}
              </p>
              <p
                className={`text-3xl font-bold ${
                  comparison.delta !== null && comparison.delta < 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {comparison.delta !== null ? `${comparison.delta >= 0 ? '+' : ''}${comparison.delta.toFixed(1)}%` : 'N/A'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ArrowUpRight className="h-5 w-5 text-emerald-400" />
              {comparison.previousLabel
                ? `Instaladas actuales: ${comparison.currentInstaladas.toLocaleString('es-HN')} · Mes anterior: ${
                    comparison.previousInstaladas?.toLocaleString('es-HN') ?? '0'
                  }`
                : 'Aún no hay suficientes datos para comparar dos meses consecutivos.'}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
