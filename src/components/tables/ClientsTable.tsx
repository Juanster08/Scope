export type ClientRow = {
  id: string;
  nombre: string;
  identidad: string;
  ciudad: string | null;
  paquete?: string | null;
  tecnologia?: string | null;
  contrato?: string | null;
  monto?: number | null;
  estadoVenta?: string | null;
  estadoServicio: string;
};

const statusColors: Record<string, string> = {
  instalada: 'bg-emerald-500/10 text-emerald-400',
  pendiente: 'bg-amber-500/10 text-amber-400',
  fallida: 'bg-rose-500/10 text-rose-400',
  mora: 'bg-orange-500/10 text-orange-400',
  desconectado: 'bg-slate-500/10 text-slate-300',
  activo: 'bg-emerald-500/10 text-emerald-400'
};

type ClientsTableProps = {
  clients: ClientRow[];
  isLoading?: boolean;
};

export const ClientsTable = ({ clients, isLoading = false }: ClientsTableProps) => {
  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-xl border border-slate-800 bg-slate-900/40" />;
  }

  if (!clients.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
        No se encontraron clientes con los filtros aplicados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-widest text-slate-400">
          <tr>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Identidad</th>
            <th className="px-4 py-3">Ciudad</th>
            <th className="px-4 py-3">Paquete</th>
            <th className="px-4 py-3">Tecnología</th>
            <th className="px-4 py-3">Contrato</th>
            <th className="px-4 py-3">Monto (Lps)</th>
            <th className="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-sm">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-4 py-3 font-medium text-slate-100">{client.nombre}</td>
              <td className="px-4 py-3 text-slate-300">{client.identidad}</td>
              <td className="px-4 py-3 text-slate-300">{client.ciudad ?? 'Sin definir'}</td>
              <td className="px-4 py-3 text-slate-300">{client.paquete ?? 'Sin asignar'}</td>
              <td className="px-4 py-3 text-slate-300">{client.tecnologia ?? 'Sin asignar'}</td>
              <td className="px-4 py-3 text-slate-300">{client.contrato ?? 'Sin contrato'}</td>
              <td className="px-4 py-3 text-slate-300">
                {client.monto ? `Lps ${client.monto.toLocaleString('es-HN')}` : '—'}
              </td>
              <td className="px-4 py-3 text-slate-300">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    statusColors[(client.estadoVenta ?? client.estadoServicio ?? '').toLowerCase()] ??
                    'bg-slate-700/40 text-slate-200'
                  }`}
                >
                  {(client.estadoVenta ?? client.estadoServicio ?? '').toUpperCase() || 'SIN ESTADO'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
