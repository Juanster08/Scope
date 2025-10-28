import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ZoneData = {
  name: string;
  ventas: number;
};

type SalesByZoneChartProps = {
  data: ZoneData[];
  isLoading?: boolean;
};

export const SalesByZoneChart = ({ data, isLoading = false }: SalesByZoneChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (isLoading) {
    return <div className="h-[260px] animate-pulse rounded-xl bg-slate-900/40" />;
  }

  if (!data.length) {
    return <p className="text-sm text-slate-400">No hay ventas registradas para las zonas seleccionadas.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        onMouseLeave={() => {
          setActiveIndex(null);
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
          contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
        />
        <Bar dataKey="ventas" radius={[12, 12, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={index === activeIndex ? '#6366f1' : '#3b82f6'}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
