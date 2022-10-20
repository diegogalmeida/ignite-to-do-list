import { Header } from './components/Header';
import { TaskList } from './components/TaskList';

import './global.css';
import styles from './App.module.css';


export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
          <TaskList />
      </div>
    </div>
  )
}
