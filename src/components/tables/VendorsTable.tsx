import { Eye, EyeOff } from 'lucide-react';
import { mockVendors } from '../../data/mockData';
import { Button } from '../common/Button';

export const VendorsTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-800">
    <table className="min-w-full divide-y divide-slate-800">
      <thead className="bg-slate-900/70 text-left text-xs uppercase tracking-widest text-slate-400">
        <tr>
          <th className="px-4 py-3">Vendedor</th>
          <th className="px-4 py-3">Zona</th>
          <th className="px-4 py-3">Ventas</th>
          <th className="px-4 py-3">Comisión (Lps)</th>
          <th className="px-4 py-3">Cumplimiento</th>
          <th className="px-4 py-3">Estado</th>
          <th className="px-4 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-sm">
        {mockVendors.map((vendor) => (
          <tr key={vendor.id}>
            <td className="px-4 py-3 font-medium text-slate-100">{vendor.nombre}</td>
            <td className="px-4 py-3 text-slate-300">{vendor.zona}</td>
            <td className="px-4 py-3 text-slate-300">{vendor.totalVentas}</td>
            <td className="px-4 py-3 text-slate-300">Lps {vendor.comision.toLocaleString('es-HN')}</td>
            <td className="px-4 py-3 text-slate-300">{vendor.cumplimiento}%</td>
            <td className="px-4 py-3 text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <Eye className="h-3 w-3" /> {vendor.estado}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" className="px-3 py-1 text-xs">Ver perfil</Button>
                <Button variant="ghost" className="px-3 py-1 text-xs text-rose-400">
                  <EyeOff className="h-4 w-4" />
                  Deshabilitar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
