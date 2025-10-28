import { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  title?: string;
  icon?: ReactNode;
  className?: string;
  description?: string;
}>;

export const Card = ({ title, icon, children, className, description }: CardProps) => (
  <div className={clsx('rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30', className)}>
    {(title || icon) && (
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
        {icon}
      </header>
    )}
    {children}
  </div>
);
