import { useState } from 'react';
import { Button } from '../common/Button';

export const GlobalFilters = () => {
  const [filters, setFilters] = useState({
    mes: 'Febrero 2024',
    zona: 'Todas',
    tecnologia: 'Todas',
    paquete: 'Todos'
  });

  const handleReset = () => {
    setFilters({ mes: 'Febrero 2024', zona: 'Todas', tecnologia: 'Todas', paquete: 'Todos' });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <span className="text-xs uppercase text-slate-500">{key}</span>
          <span className="font-medium text-slate-200">{value}</span>
        </div>
      ))}
      <div className="flex-1" />
      <Button variant="ghost" onClick={handleReset} className="text-xs">
        Limpiar filtros
      </Button>
    </div>
  );
};
