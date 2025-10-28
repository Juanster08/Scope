import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { mockSalesByTechnology } from '../../data/mockData';

const colors = ['#0ea5e9', '#9333ea', '#f97316', '#22c55e'];

export const SalesByTechnologyChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie data={mockSalesByTechnology} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
        {mockSalesByTechnology.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
      />
    </PieChart>
  </ResponsiveContainer>
);
