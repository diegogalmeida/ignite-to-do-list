import { Header } from './components/Header';
import { TaskList } from './components/TaskList';

import './styles/global.css';

export function App() {
  return (
    <div>
      <Header />
      <div className="max-w-screen-md mt-8 pb-20 px-8 mx-auto flex flex-col gap-8">
        <TaskList />
      </div>
    </div>
  )
}
