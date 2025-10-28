import { mockCommissionTable } from '../../data/mockData';

export const CommissionsTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-800">
    <table className="min-w-full divide-y divide-slate-800">
      <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-widest text-slate-400">
        <tr>
          <th className="px-4 py-3">Vendedor</th>
          <th className="px-4 py-3">Instaladas</th>
          <th className="px-4 py-3">Total comisionable</th>
          <th className="px-4 py-3">Comisión</th>
          <th className="px-4 py-3">Bonificación</th>
          <th className="px-4 py-3">Bono Meta</th>
          <th className="px-4 py-3">Bono Grupal</th>
          <th className="px-4 py-3">Total a pagar</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-sm">
        {mockCommissionTable.map((row) => {
          const total = row.comision + row.bonificacion + row.bonoMeta + row.bonoGrupal;
          return (
            <tr key={row.id}>
              <td className="px-4 py-3 font-medium text-slate-100">{row.vendedor}</td>
              <td className="px-4 py-3 text-slate-300">{row.ventasInstaladas}</td>
              <td className="px-4 py-3 text-slate-300">Lps {row.totalComisionable.toLocaleString('es-HN')}</td>
              <td className="px-4 py-3 text-slate-300">Lps {row.comision.toLocaleString('es-HN')}</td>
              <td className="px-4 py-3 text-slate-300">Lps {row.bonificacion.toLocaleString('es-HN')}</td>
              <td className="px-4 py-3 text-slate-300">Lps {row.bonoMeta.toLocaleString('es-HN')}</td>
              <td className="px-4 py-3 text-slate-300">Lps {row.bonoGrupal.toLocaleString('es-HN')}</td>
              <td className="px-4 py-3 text-slate-100 font-semibold">Lps {total.toLocaleString('es-HN')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
