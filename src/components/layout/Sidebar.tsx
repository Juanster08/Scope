import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, Target, BadgeDollarSign, Share2 } from 'lucide-react';
import clsx from 'clsx';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vendedores', label: 'Vendedores', icon: Users },
  { to: '/clientes', label: 'Clientes', icon: UserSquare2 },
  { to: '/metas', label: 'Metas', icon: Target },
  { to: '/comisiones', label: 'Comisiones', icon: BadgeDollarSign },
  { to: '/aliados', label: 'Aliados ISM', icon: Share2 }
];

export const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-800 bg-slate-900 p-6 md:flex">
      <div className="mb-8 text-2xl font-bold text-ism-light">
        Scope <span className="text-ism-red">ISM</span>
      </div>
      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-ism-blue/20 text-ism-light' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="text-xs text-slate-500">Distribuidor autorizado de Claro Honduras</p>
    </aside>
  );
};
