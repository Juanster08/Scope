import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from '../../components/common/Button';
import { CommissionsTable } from '../../components/tables/CommissionsTable';

const PlanillaPage = () => {
  const planillaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6">
      <ReactToPrint
        trigger={() => (
          <Button variant="secondary" className="print:hidden">
            Descargar PDF
          </Button>
        )}
        content={() => planillaRef.current}
      />

      <div ref={planillaRef} className="space-y-6 bg-white p-8 text-slate-900 print:bg-white">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Planilla de pagos - Febrero 2024</h1>
            <p className="text-sm text-slate-500">Distribuidor autorizado Claro Honduras</p>
          </div>
          <div className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-500">
            <p>Fecha de cálculo</p>
            <p className="font-semibold text-slate-700">{new Date().toLocaleDateString('es-HN')}</p>
          </div>
        </header>

        <CommissionsTable />
      </div>
    </div>
  );
};

export default PlanillaPage;
