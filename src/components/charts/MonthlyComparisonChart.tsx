import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type MonthlyComparisonPoint = {
  mes: string;
  ingresadas: number;
  instaladas: number;
};

type MonthlyComparisonChartProps = {
  data: MonthlyComparisonPoint[];
  isLoading?: boolean;
};

export const MonthlyComparisonChart = ({ data, isLoading = false }: MonthlyComparisonChartProps) => {
  if (isLoading) {
    return <div className="h-[260px] animate-pulse rounded-xl bg-slate-900/40" />;
  }

  if (!data.length) {
    return <p className="text-sm text-slate-400">No hay información suficiente para el comparativo mensual.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
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
        <YAxis stroke="#94a3b8" allowDecimals={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
        />
        <Area type="monotone" dataKey="ingresadas" stroke="#ef4444" fillOpacity={1} fill="url(#colorIngresadas)" />
        <Area type="monotone" dataKey="instaladas" stroke="#22c55e" fillOpacity={1} fill="url(#colorInstaladas)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
