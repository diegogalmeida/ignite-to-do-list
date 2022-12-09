import { ButtonHTMLAttributes } from 'react';
import { Trash } from "phosphor-react";

interface DeleteButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {}

export function DeleteButton(props: DeleteButtonProps) {
  return (

    <button
      className="
        bg-transparent p-[0.375rem] border-0 text-zinc-300 cursor-pointer transition-colors leading-[0] rounded
        hover:bg-zinc-700 hover:text-red-400
      "
      {...props}
    >
        <Trash size={20} />
    </button>
    
  );
}