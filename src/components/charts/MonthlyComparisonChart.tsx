import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockMonthlyComparison } from '../../data/mockData';

export const MonthlyComparisonChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={mockMonthlyComparison}>
      <defs>
        <linearGradient id="colorIngresadas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorInstaladas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="mes" stroke="#94a3b8" />
      <YAxis stroke="#94a3b8" />
      <Tooltip
        contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
      />
      <Area type="monotone" dataKey="ingresadas" stroke="#ef4444" fillOpacity={1} fill="url(#colorIngresadas)" />
      <Area type="monotone" dataKey="instaladas" stroke="#22c55e" fillOpacity={1} fill="url(#colorInstaladas)" />
    </AreaChart>
  </ResponsiveContainer>
);
