import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import {v4 as uuidv4} from 'uuid';

import { Task } from './Task';
import { Button } from './Button';
import { Input } from './Input';

import styles from './TaskList.module.css';

interface Task {
  id: string;
  title: string;
  isTaskDone: boolean;
}

export function TaskList() {

  const [ tasks, setTasks ] = useState<Task[]>([])
  const [ newTaskText, setNewTaskText] = useState('')
  const [completedTasks, setCompletedTasks] = useState(Number)

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo obrigatório!');
  }

  function hadleCreatedTask(event: FormEvent): void {
    event.preventDefault();

    const myuuid = uuidv4();
    const newTask = { id: myuuid, title: newTaskText, isTaskDone: false }

    const taskExists = tasks.find(task => task.title === newTaskText)

    if (taskExists) {
      return (
        alert('Erro! Esse Anúncio já foi adicionado a sua lista!')
      )
    }
    setTasks([...tasks, newTask]);
    setNewTaskText(''); 
  }

  function handleCompletedTasks() {
    let count = 0;
    tasks.filter(task => {
      if (task.isTaskDone === true) {
        count++;
      }
    })
    setCompletedTasks(count)
  }

  function changeIsComplete(id: string) {
    tasks.map(task => {
      if (task.id === id) {
        task.isTaskDone = !task.isTaskDone
      }
    })
    handleCompletedTasks();
  }

  function deleteTask(taskToDelete: string): void {
    setTasks(tasks.filter((taskName) => taskName.id !== taskToDelete))
  }

  const isNewTaskEmpty = newTaskText.length == 0

  return (
    <>
      <section className={styles.createTask}>
        <form onSubmit={hadleCreatedTask}>
          <Input
            name="task" 
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <Button
            type="submit"
            disabled={isNewTaskEmpty}
          >
            Criar <PlusCircle size={20} />
          </Button>
        </form>
      </section>

    
        
      <section className={styles.tasks}>
        <header>
          <div className={styles.countTask}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.countTaskIsComplet}>
            <strong>Concluídas</strong>
            <span>{completedTasks} de {tasks.length}</span>
          </div>
        </header>

      { tasks.length > 0 ? (
        <div className={styles.taskList}>
          {tasks.map(task => {
            return (    
              <Task
                id={task.id}
                key={task.id}
                content={task.title}
                onDeleteTask={deleteTask}
                onChangeIsComplete={changeIsComplete}
                isDone={task.isTaskDone}
              />      
            )
          })}
        </div>
      ) : (
        <div className={styles.noTaskList}>
          <ClipboardText size={56} weight="thin" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
      </section>
    </>
  )
} 