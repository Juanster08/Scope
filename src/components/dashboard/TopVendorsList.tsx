import { Trophy } from 'lucide-react';

type TopVendor = {
  id: string;
  nombre: string;
  zona: string | null;
  totalInstaladas: number;
};

type TopVendorsListProps = {
  vendors: TopVendor[];
  isLoading?: boolean;
};

export const TopVendorsList = ({ vendors, isLoading = false }: TopVendorsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="h-16 animate-pulse rounded-xl border border-slate-800/60 bg-slate-900/40"
          />
        ))}
      </div>
    );
  }

  if (!vendors.length) {
    return <p className="text-sm text-slate-400">No se encontraron vendedores con ventas instaladas para este filtro.</p>;
  }

  return (
    <div className="space-y-3">
      {vendors.map((vendor, index) => (
        <div
          key={vendor.id}
          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ism-blue/30 text-lg font-bold text-ism-light">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-100">{vendor.nombre}</p>
              <p className="text-xs text-slate-400">{vendor.zona ?? 'Zona sin asignar'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-right text-slate-300">
            <span className="font-semibold text-white">{vendor.totalInstaladas} instaladas</span>
            {index === 0 && <Trophy className="h-5 w-5 text-amber-400" />}
          </div>
        </div>
      ))}
    </div>
  );
};
