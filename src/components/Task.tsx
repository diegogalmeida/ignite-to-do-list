import { useState } from "react";
import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

import { DeleteButton } from "./DeleteButton";

interface TaskProps {
  id: string;
  content: string;
  isDone: boolean;
  onChangeIsComplete: (id: string) => void;
  onDeleteTask: (task: string) => void;
}

export function Task({ id, content, isDone, onChangeIsComplete, onDeleteTask}: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id); 
  }

  function handleChangeIsComplete() {
    onChangeIsComplete(id);
  }

 const [ isChecked, setIsChecked ] = useState(false) 
   
  return (
    
    <div
      className={
        isChecked
        ? "flex items-start justify-between rounded-lg bg-zinc-800 border border-transparent roudend p-4"
        : "flex items-start rounded-lg bg-zinc-800 border border-zinc-600 roudend p-4"
        }
      >
      <label htmlFor={id}
        className={
          isChecked
          ? "flex items-start gap-4 w-full justify-start text-zinc-400 line-through"
          : "flex items-start gap-4 w-full justify-start text-zinc-100"
          }
      >
        <Checkbox.Root
          id={id}
          className={
          isChecked
          ? "border-indigo-400 bg-indigo-400 hover:border-indigo-500 hover:bg-indigo-500 text-zinc-100 flex items-center justify-center border-2 h-5 w-5 p-[0.375rem] mt-[0.375rem] leading-[0] outline-0 rounded-full transition-colors"
          : "border-sky-400 bg-transparent hover:border-sky-600 hover:bg-zinc-900 flex items-center justify-center border-2 h-5 w-5 p-[0.375rem] mt-[0.375rem] leading-none outline-0 rounded-full transition-colors"
          }
          checked={isChecked}
          onCheckedChange={(checked) => {
            if (checked === true) {
              setIsChecked(true)
            } else {
              setIsChecked(false)
            }
          }}
          onClick={handleChangeIsComplete}
        >
          <Checkbox.Indicator>
            <Check size={12} weight="bold"></Check>
          </Checkbox.Indicator>
        </Checkbox.Root>

        <p className={
          isChecked
          ? "mt-1 text-zinc-400 line-through pr-2"
          : "mt-1 text-zinc-100 pr-2"
          }
        >
          {content}
        </p>
      </label> 
      <DeleteButton
        title="Deletar Tarefa"
        onClick={handleDeleteTask}
      />
    </div> 
  );
}
