import { Activity, ArrowUpRight, BadgePercent, Clock, TrendingUp } from 'lucide-react';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { GlobalFilters } from '../../components/dashboard/GlobalFilters';
import { TopVendorsList } from '../../components/dashboard/TopVendorsList';
import { SalesByZoneChart } from '../../components/charts/SalesByZoneChart';
import { SalesByTechnologyChart } from '../../components/charts/SalesByTechnologyChart';
import { MonthlyComparisonChart } from '../../components/charts/MonthlyComparisonChart';
import { Card } from '../../components/common/Card';
import { mockKpis } from '../../data/mockData';

const icons = [Activity, TrendingUp, BadgePercent, Clock];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <GlobalFilters />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockKpis.map((kpi, index) => {
          const Icon = icons[index % icons.length];
          return (
            <KpiCard
              key={kpi.label}
              title={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              icon={<Icon className="h-5 w-5 text-ism-light" />}
            />
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Ranking de vendedores"
          description="Top 10 por ventas instaladas"
          className="lg:col-span-1"
        >
          <TopVendorsList />
        </Card>
        <Card title="Ventas por zonas" className="lg:col-span-2">
          <SalesByZoneChart />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Ventas por tecnología" className="lg:col-span-1">
          <SalesByTechnologyChart />
        </Card>
        <Card title="Comparativo mensual" description="Ingresadas vs instaladas" className="lg:col-span-2">
          <MonthlyComparisonChart />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Ventas por tipo de paquete" description="Distribución porcentual">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center justify-between">
              <span>OnePlay</span>
              <span className="font-semibold text-white">28%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>DoublePlay</span>
              <span className="font-semibold text-white">32%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>TriplePlay</span>
              <span className="font-semibold text-white">25%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Full</span>
              <span className="font-semibold text-white">15%</span>
            </li>
          </ul>
        </Card>
        <Card title="Referidos del mes" description="Alianzas estratégicas">
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Total referidos</span>
              <span className="font-semibold text-white">63</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Instalados por referidos</span>
              <span className="font-semibold text-white">41 (65%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Meta mensual de referidos</span>
              <span className="font-semibold text-white">60</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Mes actual vs anterior" description="Variación porcentual">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">Febrero 2024 vs Enero 2024</p>
            <p className="text-3xl font-bold text-emerald-400">+9.4%</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <ArrowUpRight className="h-5 w-5 text-emerald-400" />
            Incremento en ventas instaladas respecto al mes anterior
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
