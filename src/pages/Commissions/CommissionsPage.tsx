import { Calculator, FileOutput } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CommissionsTable } from '../../components/tables/CommissionsTable';

const CommissionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Calculator className="h-4 w-4" />
          Calcular comisiones
        </Button>
        <Button variant="secondary">
          <FileOutput className="h-4 w-4" />
          Guardar configuración
        </Button>
        <Button variant="ghost" className="text-slate-300">
          Agregar comisión extra
        </Button>
      </div>

      <Card title="Rangos de comisión" description="Multiplicadores por tipo de paquete">
        <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-300">
          <div className="rounded-xl bg-slate-900/70 p-4">
            <p className="text-slate-400">OnePlay</p>
            <p className="text-2xl font-bold text-white">Lps 650 - 950</p>
            <p className="text-xs text-slate-500">Multiplicador 1.2x</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4">
            <p className="text-slate-400">DoublePlay</p>
            <p className="text-2xl font-bold text-white">Lps 900 - 1,250</p>
            <p className="text-xs text-slate-500">Multiplicador 1.45x</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4">
            <p className="text-slate-400">TriplePlay / Full</p>
            <p className="text-2xl font-bold text-white">Lps 1,200 - 1,800</p>
            <p className="text-xs text-slate-500">Multiplicador 1.65x</p>
          </div>
        </div>
      </Card>

      <CommissionsTable />
    </div>
  );
};

export default CommissionsPage;
