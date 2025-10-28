import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockSalesByZone } from '../../data/mockData';

export const SalesByZoneChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={mockSalesByZone}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
      <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
      <Tooltip
        contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', color: '#e2e8f0' }}
      />
      <Bar dataKey="ventas" fill="#3b82f6" radius={[12, 12, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
