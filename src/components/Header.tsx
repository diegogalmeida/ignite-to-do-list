import toDoLogo from '../assets/to-do-logo.svg'

export function Header() {
  return (
    <header className="bg-black flex justify-center py-20 px-0 items-center">
      <img src={toDoLogo} alt="ToDo List" />
    </header>
  );
}