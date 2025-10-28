import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Download, Filter, PlusCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ClientRow, ClientsTable } from '../../components/tables/ClientsTable';
import { supabase } from '../../lib/supabaseClient';

type ClientRecord = ClientRow & {
  estadoVentaNormalized: string | null;
  estadoServicioNormalized: string;
  mesClave: string | null;
};

const selectStyles =
  'rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm focus:border-ism-blue focus:outline-none focus:ring-2 focus:ring-ism-blue/40';

const estadoServicioOptions = [
  { label: 'Todos los estados', value: 'all' },
  { label: 'Activos', value: 'activo' },
  { label: 'Pendientes', value: 'pendiente' },
  { label: 'Instalados', value: 'instalada' },
  { label: 'Fallidos', value: 'fallida' },
  { label: 'Mora', value: 'mora' },
  { label: 'Desconectados', value: 'desconectado' }
];

const formatMonthLabel = (key: string) => {
  const [year, month] = key.split('-').map(Number);
  const date = new Date(year, (month ?? 1) - 1, 1);
  return new Intl.DateTimeFormat('es-HN', { month: 'long', year: 'numeric' }).format(date);
};

const ClientsPage = () => {
  const [rawClients, setRawClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState({ estado: 'all', ciudad: 'all', mes: 'all' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nombre_completo: '',
    identidad: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    estado_servicio: 'activo',
    fecha_contratacion: '',
    fecha_instalacion: '',
    total_a_pagar: ''
  });

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('clientes')
        .select(
          'id, nombre_completo, identidad, telefono, direccion, ciudad, estado_servicio, fecha_contratacion, fecha_instalacion, total_a_pagar, ventas ( numero_contrato, tipo_paquete, tecnologia, monto, estado, fecha_contratacion, fecha_instalacion, created_at )'
        )
        .order('fecha_contratacion', { foreignTable: 'ventas', ascending: false })
        .limit(1, { foreignTable: 'ventas' });

      if (queryError) throw queryError;

      const mapped: ClientRecord[] = (data ?? []).map((client) => {
        const latestVenta = (client.ventas ?? [])[0] ?? null;
        const mesClave = latestVenta?.fecha_contratacion
          ? `${new Date(latestVenta.fecha_contratacion).getFullYear()}-${String(
              new Date(latestVenta.fecha_contratacion).getMonth() + 1
            ).padStart(2, '0')}`
          : client.fecha_contratacion
            ? `${new Date(client.fecha_contratacion).getFullYear()}-${String(
                new Date(client.fecha_contratacion).getMonth() + 1
              ).padStart(2, '0')}`
            : null;

        return {
          id: client.id,
          nombre: client.nombre_completo,
          identidad: client.identidad,
          ciudad: client.ciudad ?? null,
          paquete: latestVenta?.tipo_paquete ? latestVenta.tipo_paquete.toUpperCase() : null,
          tecnologia: latestVenta?.tecnologia ? latestVenta.tecnologia.toUpperCase() : null,
          contrato: latestVenta?.numero_contrato ?? null,
          monto: latestVenta?.monto ?? client.total_a_pagar ?? null,
          estadoVenta: latestVenta?.estado ?? null,
          estadoServicio: client.estado_servicio,
          estadoVentaNormalized: latestVenta?.estado?.toLowerCase() ?? null,
          estadoServicioNormalized: (client.estado_servicio ?? '').toLowerCase(),
          mesClave
        } as ClientRecord;
      });

      setRawClients(mapped);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFilterChange = (key: 'estado' | 'ciudad' | 'mes') => (event: ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const filteredClients = useMemo(() => {
    return rawClients.filter((client) => {
      const estado = client.estadoVentaNormalized ?? client.estadoServicioNormalized;
      if (filters.estado !== 'all' && estado !== filters.estado) return false;

      if (filters.ciudad !== 'all' && (client.ciudad ?? 'sin-ciudad') !== filters.ciudad) return false;

      if (filters.mes !== 'all' && client.mesClave !== filters.mes) return false;

      return true;
    });
  }, [rawClients, filters]);

  const resumenEstados = useMemo(() => {
    const summary = {
      pendiente: 0,
      instalada: 0,
      mora: 0,
      desconectado: 0
    };

    filteredClients.forEach((client) => {
      const estado = (client.estadoVentaNormalized ?? client.estadoServicioNormalized) as keyof typeof summary;
      if (estado in summary) {
        summary[estado] += 1;
      }
    });

    return summary;
  }, [filteredClients]);

  const uniqueCities = useMemo(() => {
    const set = new Set<string>();
    rawClients.forEach((client) => {
      if (client.ciudad) set.add(client.ciudad);
    });
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))];
  }, [rawClients]);

  const uniqueMonths = useMemo(() => {
    const set = new Set<string>();
    rawClients.forEach((client) => {
      if (client.mesClave) set.add(client.mesClave);
    });
    return ['all', ...Array.from(set).sort()];
  }, [rawClients]);

  const resetForm = () => {
    setForm({
      nombre_completo: '',
      identidad: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      estado_servicio: 'activo',
      fecha_contratacion: '',
      fecha_instalacion: '',
      total_a_pagar: ''
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const { error: insertError } = await supabase.from('clientes').insert({
        nombre_completo: form.nombre_completo,
        identidad: form.identidad,
        telefono: form.telefono || null,
        direccion: form.direccion || null,
        ciudad: form.ciudad || null,
        estado_servicio: form.estado_servicio,
        fecha_contratacion: form.fecha_contratacion || null,
        fecha_instalacion: form.fecha_instalacion || null,
        total_a_pagar: form.total_a_pagar ? Number(form.total_a_pagar) : null
      });

      if (insertError) throw insertError;

      setSuccessMessage('Cliente creado correctamente.');
      resetForm();
      setIsFormOpen(false);
      await fetchClients();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'No se pudo registrar el cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [successMessage]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setIsFormOpen((prev) => !prev)}>
          <PlusCircle className="h-4 w-4" />
          {isFormOpen ? 'Cerrar formulario' : 'Agregar cliente'}
        </Button>
        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-200">
          <Filter className="h-4 w-4 text-slate-400" />
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-col text-xs text-slate-400">
              Estado
              <select className={selectStyles} value={filters.estado} onChange={handleFilterChange('estado')}>
                {estadoServicioOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-xs text-slate-400">
              Ciudad/Zona
              <select className={selectStyles} value={filters.ciudad} onChange={handleFilterChange('ciudad')}>
                <option value="all">Todas</option>
                {uniqueCities
                  .filter((city) => city !== 'all')
                  .map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </label>
            <label className="flex flex-col text-xs text-slate-400">
              Mes
              <select className={selectStyles} value={filters.mes} onChange={handleFilterChange('mes')}>
                <option value="all">Todos</option>
                {uniqueMonths
                  .filter((month) => month !== 'all')
                  .map((month) => (
                    <option key={month} value={month}>
                      {formatMonthLabel(month)}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="ghost" className="text-slate-300">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
          <Button variant="ghost" className="text-slate-300">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {successMessage}
        </div>
      )}

      {isFormOpen && (
        <Card title="Registrar nuevo cliente" description="Completa los datos mínimos para guardar el registro." className="border-ism-blue/40">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-300">
              Nombre completo
              <input
                className={selectStyles}
                value={form.nombre_completo}
                onChange={(event) => setForm((prev) => ({ ...prev, nombre_completo: event.target.value }))}
                required
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Identidad
              <input
                className={selectStyles}
                value={form.identidad}
                onChange={(event) => setForm((prev) => ({ ...prev, identidad: event.target.value }))}
                required
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Teléfono
              <input
                className={selectStyles}
                value={form.telefono}
                onChange={(event) => setForm((prev) => ({ ...prev, telefono: event.target.value }))}
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Dirección
              <input
                className={selectStyles}
                value={form.direccion}
                onChange={(event) => setForm((prev) => ({ ...prev, direccion: event.target.value }))}
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Ciudad / Zona
              <input
                className={selectStyles}
                value={form.ciudad}
                onChange={(event) => setForm((prev) => ({ ...prev, ciudad: event.target.value }))}
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Estado del servicio
              <select
                className={selectStyles}
                value={form.estado_servicio}
                onChange={(event) => setForm((prev) => ({ ...prev, estado_servicio: event.target.value }))}
              >
                <option value="activo">Activo</option>
                <option value="mora">Mora</option>
                <option value="desconectado">Desconectado</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Fecha de contratación
              <input
                type="date"
                className={selectStyles}
                value={form.fecha_contratacion}
                onChange={(event) => setForm((prev) => ({ ...prev, fecha_contratacion: event.target.value }))}
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Fecha de instalación
              <input
                type="date"
                className={selectStyles}
                value={form.fecha_instalacion}
                onChange={(event) => setForm((prev) => ({ ...prev, fecha_instalacion: event.target.value }))}
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Total a pagar (Lps)
              <input
                type="number"
                className={selectStyles}
                value={form.total_a_pagar}
                onChange={(event) => setForm((prev) => ({ ...prev, total_a_pagar: event.target.value }))}
                min={0}
                step="0.01"
              />
            </label>
            <div className="md:col-span-2 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => { resetForm(); setIsFormOpen(false); }}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar cliente'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Resumen de clientes" description="Estados de instalación">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Pendientes</p>
            <p className="text-2xl font-bold text-white">{resumenEstados.pendiente}</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Instaladas</p>
            <p className="text-2xl font-bold text-white">{resumenEstados.instalada}</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">En mora</p>
            <p className="text-2xl font-bold text-white">{resumenEstados.mora}</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Desconectados</p>
            <p className="text-2xl font-bold text-white">{resumenEstados.desconectado}</p>
          </div>
        </div>
      </Card>

      <ClientsTable clients={filteredClients} isLoading={loading} />
    </div>
  );
};

export default ClientsPage;
