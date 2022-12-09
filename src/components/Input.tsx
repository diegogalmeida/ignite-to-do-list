import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="w-full h-16 p-4 rounded-lg bg-zinc-800 border border-zinc-900 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 focus>shadow-lg"
      {...props}
    />
  )
}