import { CalendarDays, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLastUpdated } from '../../hooks/useLastUpdated';
import { Button } from '../common/Button';

const breadcrumbs: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/vendedores': 'Vendedores',
  '/clientes': 'Clientes',
  '/metas': 'Metas',
  '/comisiones': 'Comisiones',
  '/comisiones/planilla': 'Planilla de Pagos',
  '/aliados': 'Aliados ISM'
};

export const TopBar = () => {
  const location = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);
  const { lastUpdated, triggerUpdate } = useLastUpdated();

  const handleSync = async () => {
    setIsSyncing(true);
    await triggerUpdate();
    setIsSyncing(false);
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold text-white">{breadcrumbs[location.pathname] ?? 'Dashboard'}</h1>
        <p className="text-sm text-slate-400">Panel de control integral para ventas Claro Honduras</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4" />
          <span>Última actualización:</span>
          <span className="font-medium text-ism-light">{lastUpdated ?? 'Sin sincronizar'}</span>
        </div>
        <Button onClick={handleSync} disabled={isSyncing} variant="secondary">
          <RefreshCcw className={isSyncing ? 'animate-spin' : ''} size={16} />
          {isSyncing ? 'Actualizando...' : 'Actualizar desde Sheets'}
        </Button>
        <Link to="/comisiones/planilla">
          <Button variant="primary">Imprimir planilla</Button>
        </Link>
      </div>
    </header>
  );
};
