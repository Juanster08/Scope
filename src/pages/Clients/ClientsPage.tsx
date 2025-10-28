import { Download, Filter } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ClientsTable } from '../../components/tables/ClientsTable';

const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary">
          <Filter className="h-4 w-4" />
          Estado
        </Button>
        <Button variant="secondary">Zona</Button>
        <Button variant="secondary">Mes</Button>
        <Button variant="ghost" className="text-slate-300">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
        <Button variant="ghost" className="text-slate-300">
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      <Card title="Resumen de clientes" description="Estados de instalación">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Pendientes</p>
            <p className="text-2xl font-bold text-white">32</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Instaladas</p>
            <p className="text-2xl font-bold text-white">198</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">En mora</p>
            <p className="text-2xl font-bold text-white">14</p>
          </div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-slate-400">Desconectados</p>
            <p className="text-2xl font-bold text-white">6</p>
          </div>
        </div>
      </Card>

      <ClientsTable />
    </div>
  );
};

export default ClientsPage;
