import { Trophy } from 'lucide-react';
import { mockVendors } from '../../data/mockData';

export const TopVendorsList = () => {
  const sorted = [...mockVendors].sort((a, b) => b.totalVentas - a.totalVentas).slice(0, 10);

  return (
    <div className="space-y-3">
      {sorted.map((vendor, index) => (
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
              <p className="text-xs text-slate-400">{vendor.zona}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-right text-slate-300">
            <span className="font-semibold text-white">{vendor.totalVentas} ventas</span>
            {index === 0 && <Trophy className="h-5 w-5 text-amber-400" />}
          </div>
        </div>
      ))}
    </div>
  );
};
