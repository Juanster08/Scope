import { Trophy } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { mockAllies } from '../../data/mockData';

const AlliesPage = () => {
  const ranking = [...mockAllies].sort((a, b) => b.instalados - a.instalados);

  return (
    <div className="space-y-6">
      <Card title="Aliados estratégicos" description="Referidos y comisiones">
        <div className="grid gap-4 md:grid-cols-3">
          {ranking.map((ally, index) => (
            <div key={ally.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{ally.nombre}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-500">{ally.codigo}</p>
                </div>
                {index === 0 && <Trophy className="h-6 w-6 text-amber-400" />}
              </div>
              <div className="mt-4 space-y-2 text-slate-300">
                <p>
                  <span className="text-slate-500">Referidos:</span> {ally.referidos}
                </p>
                <p>
                  <span className="text-slate-500">Instalados:</span> {ally.instalados}
                </p>
                <p>
                  <span className="text-slate-500">Comisión total:</span> Lps {ally.comision.toLocaleString('es-HN')}
                </p>
                <p>
                  <span className="text-slate-500">Estado de pago:</span> {ally.estado}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AlliesPage;
