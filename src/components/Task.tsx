import { useState } from "react";
import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

import { DeleteButton } from "./DeleteButton";
import styles from './Task.module.css';

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
    <div className={isChecked ? styles.taskIsDoneBox : styles.taskBox}>
      <Checkbox.Root
        id={id}
        className={styles.checkTask}
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
      
      <label htmlFor={id}>
        {content}
      </label> 
      <DeleteButton
        title="Deletar Tarefa"
        onClick={handleDeleteTask}
      />
    </div>  
  );
}
