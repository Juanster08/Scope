import { ChangeEvent } from 'react';
import { Button } from '../common/Button';

export type FilterOption = {
  label: string;
  value: string;
};

export type GlobalFilterValue = {
  month: string;
  zone: string;
  technology: string;
  packageType: string;
};

type GlobalFiltersProps = {
  value: GlobalFilterValue;
  onChange: (value: GlobalFilterValue) => void;
  options: {
    months: FilterOption[];
    zones: FilterOption[];
    technologies: FilterOption[];
    packages: FilterOption[];
  };
  disabled?: boolean;
};

const selectStyles =
  'w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 shadow-sm focus:border-ism-blue focus:outline-none focus:ring-2 focus:ring-ism-blue/40 disabled:cursor-not-allowed disabled:opacity-50';

export const GlobalFilters = ({ value, onChange, options, disabled = false }: GlobalFiltersProps) => {
  const handleSelect = (key: keyof GlobalFilterValue) => (event: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, [key]: event.target.value });
  };

  const handleReset = () => {
    onChange({ month: 'all', zone: 'all', technology: 'all', packageType: 'all' });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Filtros globales</h3>
          <p className="text-xs text-slate-400">Ajusta los datos del dashboard por periodo, zona y segmento.</p>
        </div>
        <Button variant="ghost" onClick={handleReset} className="text-xs" disabled={disabled}>
          Limpiar filtros
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          Mes o rango
          <select
            className={selectStyles}
            value={value.month}
            onChange={handleSelect('month')}
            disabled={disabled}
          >
            {options.months.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          Zona
          <select className={selectStyles} value={value.zone} onChange={handleSelect('zone')} disabled={disabled}>
            {options.zones.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          Tecnología
          <select
            className={selectStyles}
            value={value.technology}
            onChange={handleSelect('technology')}
            disabled={disabled}
          >
            {options.technologies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          Tipo de paquete
          <select
            className={selectStyles}
            value={value.packageType}
            onChange={handleSelect('packageType')}
            disabled={disabled}
          >
            {options.packages.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
