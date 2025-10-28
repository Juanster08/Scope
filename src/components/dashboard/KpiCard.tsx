import { ReactNode } from 'react';
import { Card } from '../common/Card';

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
}

export const KpiCard = ({ title, value, delta, icon }: KpiCardProps) => (
  <Card
    title={title}
    icon={icon}
    className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950"
    description={delta}
  >
    <p className="text-3xl font-bold text-white">{value}</p>
  </Card>
);
