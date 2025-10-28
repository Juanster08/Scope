import { mockClients } from '../../data/mockData';

const statusColors: Record<string, string> = {
  instalada: 'bg-emerald-500/10 text-emerald-400',
  pendiente: 'bg-amber-500/10 text-amber-400',
  fallida: 'bg-rose-500/10 text-rose-400',
  mora: 'bg-orange-500/10 text-orange-400',
  desconectado: 'bg-slate-500/10 text-slate-300'
};

export const ClientsTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-800">
    <table className="min-w-full divide-y divide-slate-800">
      <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-widest text-slate-400">
        <tr>
          <th className="px-4 py-3">Cliente</th>
          <th className="px-4 py-3">Identidad</th>
          <th className="px-4 py-3">Paquete</th>
          <th className="px-4 py-3">Tecnología</th>
          <th className="px-4 py-3">Contrato</th>
          <th className="px-4 py-3">Monto (Lps)</th>
          <th className="px-4 py-3">Estado</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-sm">
        {mockClients.map((client) => (
          <tr key={client.id}>
            <td className="px-4 py-3 font-medium text-slate-100">{client.nombre}</td>
            <td className="px-4 py-3 text-slate-300">{client.identidad}</td>
            <td className="px-4 py-3 text-slate-300">{client.paquete}</td>
            <td className="px-4 py-3 text-slate-300">{client.tecnologia}</td>
            <td className="px-4 py-3 text-slate-300">{client.contrato}</td>
            <td className="px-4 py-3 text-slate-300">Lps {client.monto.toLocaleString('es-HN')}</td>
            <td className="px-4 py-3 text-slate-300">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusColors[client.estado] ?? 'bg-slate-700/40 text-slate-200'}`}>
                {client.estado}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
