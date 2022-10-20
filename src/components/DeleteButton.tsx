import { ButtonHTMLAttributes } from 'react';
import { Trash } from "phosphor-react";
import styles from './DeleteButton.module.css';

interface DeleteButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {}

export function DeleteButton(props: DeleteButtonProps) {
  return (

    <button
      className={styles.taskDeleteButton}
      {...props}
    >
        <Trash size={20} />
    </button>
    
  );
}