import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full sm:w-auto px-6 py-0 h-16 rounded-lg border border-zinc-900 bg-sky-600 text-zinc-100 font-bold flex items-center justify-center gap-2 transition-colors hover:bg-sky-500 focus:ring-1 ring-white disabled:cursor-not-allowed disabled:hover:bg-sky-600"
      {...props}
    >
      {children}
    </button>
  );
}