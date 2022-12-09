import { FormEvent, useState, Fragment, ChangeEvent, InvalidEvent } from 'react';
import { Check, ClipboardText, Plus, PlusCircle, TrashSimple, Warning, X } from 'phosphor-react';
import {v4 as uuidv4} from 'uuid';
import * as ToastPrimitive from "@radix-ui/react-toast";
import cx from "classnames";

import { Transition } from "@headlessui/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { Task } from './Task';
import { Button } from './Button';
import { Input } from './Input';

interface Task {
  id: string;
  title: string;
  isTaskDone: boolean;
}

export function TaskList() {

  const [ tasks, setTasks ] = useState<Task[]>([])
  const [ newTaskText, setNewTaskText ] = useState('')
  const [ completedTasks, setCompletedTasks ] = useState(Number)
  const [ openToastCreatedTask, setOpenToastCreatedTask ] = useState(false)
  const [ openToastCompletedTasks, setOpenToastCompletedTasks ] = useState(false)
  const [ openToastDeletedTasks, setOpenToastDeletedTasks ] = useState(false)
  const [ openToastDuplicateTasks, setOpenToastDuplicateTasks ] = useState(false)
  const [ isAlertOpen, setIsAlertOpen ] = useState(false)

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
        toastDuplicateTask()
      )
    }
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    toastCreatedTask();
  }

  function handleCompletedTasks() {
    let count = 0;
    tasks.filter(task => {
      if (task.isTaskDone === true) {
        count++;
        toastCompletedTask();
      }
    })
    setCompletedTasks(count);
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
    toastDeletedTask();
  }

  function toastCreatedTask() {
    setOpenToastCreatedTask(false)
    setTimeout(() => {
      setOpenToastCreatedTask(true);
    }, 400) 
  }

  function toastCompletedTask() {
    setOpenToastCompletedTasks(false)
    setTimeout(() => {
      setOpenToastCompletedTasks(true);
    }, 400) 
  }

  function toastDuplicateTask() {
    setOpenToastDuplicateTasks(false)
    setTimeout(() => {
      setOpenToastDuplicateTasks(true);
    }, 400) 
  }
  
  function toastDeletedTask() {
    setOpenToastDeletedTasks(false)
    setTimeout(() => {
      setOpenToastDeletedTasks(true);
    }, 400) 
  }

  const isNewTaskEmpty = newTaskText.length == 0

  return (
    <>
      <form onSubmit={hadleCreatedTask} className="-mt-16 flex flex-col justify-between items-center gap-2 sm:flex-row">
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
        
      <section className="mt-8 sm:mt-16">
        <header className="flex justify-between items-center text-sm font-bold">
          <div>
            <strong className="mr-2 text-sky-500">Tarefas criadas</strong>
            <span className="px-2 py-[0.125rem] bg-zinc-700 text-xs text-zinc-200 rounded-full">{tasks.length}</span>
          </div>

          <div>
            <strong className="mr-2 text-indigo-400">Concluídas</strong>
            <span className="px-2 py-[0.125rem] bg-zinc-700 text-xs text-zinc-200 rounded-full">{completedTasks}</span>
          </div>
        </header>

      { tasks.length > 0 ? (
        <div className="flex flex-col mt-6 gap-4">
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
        <div className="text-xs sm:text-sm flex flex-col mt-6 px-8 py-16 border-t border-zinc-700 rounded-lg items-center text-center text-zinc-400">
          <ClipboardText size={62} weight="thin" className="text-zinc-600 mb-4" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}

      
      <ToastPrimitive.Provider>
        <ToastPrimitive.Root
          open={openToastCreatedTask}
          onOpenChange={setOpenToastCreatedTask}
          duration={3000}
          className={cx(
            "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-auto md:left-4 md:top-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
            "bg-gray-800 border-gray-600",
            "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "radix-swipe-end:animate-toast-swipe-out",
            "translate-x-radix-toast-swipe-move-x",
            "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-600 focus-visible:ring-opacity-75"
          )}
        >
          <div className="flex">
            <div className="w-0 flex-1 flex items-center pl-5 py-4">
              <div className="w-full radix">
                <ToastPrimitive.Title
                  className="flex gap-2 text-sm font-medium text-sky-500"
                >
                  Tarefa criada com sucesso!
                </ToastPrimitive.Title>
                
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col px-3 py-2 space-y-1">
                <div className="h-0 flex-1 flex">
                  <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-red-400 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <X size={20} weight="bold"/>
                  </ToastPrimitive.Close>
                </div>
              </div>
            </div>
          </div>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>
        

      <ToastPrimitive.Provider>
        <ToastPrimitive.Root
          open={openToastCompletedTasks}
          onOpenChange={setOpenToastCompletedTasks}
          duration={3000}
          className={cx(
            "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-auto md:left-4 md:top-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
            "bg-gray-800 border-gray-600",
            "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "radix-swipe-end:animate-toast-swipe-out",
            "translate-x-radix-toast-swipe-move-x",
            "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-600 focus-visible:ring-opacity-75"
          )}
        >
          <div className="flex">
            <div className="w-0 flex-1 flex items-center pl-5 py-4">
              <div className="w-full radix">
                <ToastPrimitive.Title
                  className="flex gap-2 text-sm font-medium text-indigo-400"
                >
                  Tarefa concluída com sucesso!
                </ToastPrimitive.Title>
                
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col px-3 py-2 space-y-1">
                <div className="h-0 flex-1 flex">
                  <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-red-400 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <X size={20} weight="bold" />
                  </ToastPrimitive.Close>
                </div>
              </div>
            </div>
          </div>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>

      <ToastPrimitive.Provider>
        <ToastPrimitive.Root
          open={openToastDeletedTasks}
          onOpenChange={setOpenToastDeletedTasks}
          duration={3000}
          className={cx(
            "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-auto md:left-4 md:top-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
            "bg-gray-800 border-gray-600",
            "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "radix-swipe-end:animate-toast-swipe-out",
            "translate-x-radix-toast-swipe-move-x",
            "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-600 focus-visible:ring-opacity-75"
          )}
        >
          <div className="flex">
            <div className="w-0 flex-1 flex items-center pl-5 py-4">
              <div className="w-full radix">
                <ToastPrimitive.Title
                  className="flex gap-2 text-sm font-medium text-red-400"
                >
                  <TrashSimple size={20} weight="bold" />
                  Tarefa excluída com sucesso!
                </ToastPrimitive.Title>
                
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col px-3 py-2 space-y-1">
                <div className="h-0 flex-1 flex">
                  <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-red-400 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <X size={20} weight="bold" />
                  </ToastPrimitive.Close>
                </div>
              </div>
            </div>
          </div>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>


      <ToastPrimitive.Provider>
        <ToastPrimitive.Root
          open={openToastDuplicateTasks}
          onOpenChange={setOpenToastDuplicateTasks}
          duration={3000}
          className={cx(
            "z-50 fixed bottom-4 inset-x-4 w-auto md:bottom-4 md:right-auto md:left-4 md:top-auto md:w-full md:max-w-sm shadow-lg rounded-lg",
            "bg-gray-800 border-gray-600",
            "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "radix-swipe-end:animate-toast-swipe-out",
            "translate-x-radix-toast-swipe-move-x",
            "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
            "focus:outline-none focus-visible:ring focus-visible:ring-gray-600 focus-visible:ring-opacity-75"
          )}
        >
          <div className="flex">
            <div className="w-0 flex-1 flex items-center pl-5 py-4">
              <div className="w-full radix">
                <ToastPrimitive.Title
                  className="flex gap-2 text-sm font-medium text-red-400"
                >
                 <Warning size={20} weight="bold" />
                 Tarefa já adicionada a lista!
                </ToastPrimitive.Title>
                
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col px-3 py-2 space-y-1">
                <div className="h-0 flex-1 flex">
                  <ToastPrimitive.Close className="w-full border border-transparent rounded-lg px-3 py-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-red-400 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <X size={20} weight="bold" />
                  </ToastPrimitive.Close>
                </div>
              </div>
            </div>
          </div>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider>        
      </section>
    </>
  )
} 