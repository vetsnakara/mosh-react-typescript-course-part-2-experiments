import "./App.css";

import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";

import { AuthProvider } from "./state-management/auth";
import { TasksProvider } from "./state-management/tasks";
import Counter from "./state-management/counter/Counter";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Counter />
        <NavBar />
        <HomePage />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
