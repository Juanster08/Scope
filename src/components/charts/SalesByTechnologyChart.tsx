import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#0ea5e9', '#9333ea', '#f97316', '#22c55e'];

type TechnologyData = {
  name: string;
  value: number;
};

type SalesByTechnologyChartProps = {
  data: TechnologyData[];
  isLoading?: boolean;
};

export const SalesByTechnologyChart = ({ data, isLoading = false }: SalesByTechnologyChartProps) => {
  if (isLoading) {
    return <div className="h-[260px] animate-pulse rounded-xl bg-slate-900/40" />;
  }

  if (!data.length) {
    return <p className="text-sm text-slate-400">No hay ventas registradas con la tecnología seleccionada.</p>;
  }

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} ventas (${total ? Math.round((value * 100) / total) : 0}%)`,
              name
            ]}
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid gap-2 text-sm text-slate-300">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center justify-between rounded-lg bg-slate-900/40 px-3 py-2">
            <span className="flex items-center gap-2">
              <span
                className="inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              {entry.name}
            </span>
            <span className="font-semibold text-white">
              {entry.value} ventas ({total ? Math.round((entry.value * 100) / total) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
