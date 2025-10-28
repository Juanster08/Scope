import { mockGoals } from '../../data/mockData';

export const GoalsTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-800">
    <table className="min-w-full divide-y divide-slate-800">
      <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-widest text-slate-400">
        <tr>
          <th className="px-4 py-3">Vendedor</th>
          <th className="px-4 py-3">Meta (servicios)</th>
          <th className="px-4 py-3">Logrados</th>
          <th className="px-4 py-3">% Cumplimiento</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-sm">
        {mockGoals.map((goal) => (
          <tr key={goal.id}>
            <td className="px-4 py-3 font-medium text-slate-100">{goal.vendedor}</td>
            <td className="px-4 py-3 text-slate-300">{goal.serviciosMeta}</td>
            <td className="px-4 py-3 text-slate-300">{goal.serviciosLogrados}</td>
            <td className="px-4 py-3 text-slate-300">{goal.porcentaje}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
