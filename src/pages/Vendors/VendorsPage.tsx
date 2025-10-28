import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { VendorsTable } from '../../components/tables/VendorsTable';

const VendorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            className="h-10 w-72 rounded-lg border border-slate-800 bg-slate-900/60 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-ism-blue focus:outline-none"
            placeholder="Buscar vendedor por nombre o identidad"
          />
        </div>
        <Button variant="secondary">Filtrar por mes</Button>
        <Button variant="secondary">Filtrar por zona</Button>
        <Button>
          <Plus className="h-4 w-4" />
          Agregar vendedor
        </Button>
      </div>

      <Card title="Resumen de vendedores" description="Estado actual de la fuerza comercial">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Vendedores activos</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Vendedores inactivos</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Promedio cumplimiento</p>
            <p className="text-2xl font-bold text-white">86%</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Comisión estimada</p>
            <p className="text-2xl font-bold text-white">Lps 420,000</p>
          </div>
        </div>
      </Card>

      <VendorsTable />
    </div>
  );
};

export default VendorsPage;
