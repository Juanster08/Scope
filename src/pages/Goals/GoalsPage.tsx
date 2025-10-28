import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { GoalsTable } from '../../components/tables/GoalsTable';

const GoalsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary">Mes actual</Button>
        <Button variant="secondary">Historial</Button>
        <Button>Crear meta</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Meta general" description="Servicios">
          <p className="text-4xl font-bold text-white">225</p>
          <p className="text-sm text-slate-400">Meta conjunta de febrero 2024</p>
        </Card>
        <Card title="Servicios vendidos" description="Acumulado del mes">
          <p className="text-4xl font-bold text-white">198</p>
          <p className="text-sm text-emerald-400">88% de avance</p>
        </Card>
        <Card title="Proyección" description="Pronóstico">
          <p className="text-4xl font-bold text-white">236</p>
          <p className="text-sm text-slate-400">Con base a tendencia semanal</p>
        </Card>
      </div>

      <GoalsTable />
    </div>
  );
};

export default GoalsPage;
