import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ism-red hover:bg-ism-red/90 text-white shadow-sm shadow-ism-red/40',
  secondary: 'bg-ism-blue/40 hover:bg-ism-blue/60 text-ism-light border border-ism-blue/70',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-200 border border-transparent'
};

export const Button = ({ variant = 'primary', children, className, ...props }: PropsWithChildren<ButtonProps>) => (
  <button
    className={clsx(
      'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ism-blue focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70',
      variantStyles[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
