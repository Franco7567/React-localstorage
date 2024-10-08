import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
function App() {
  const [taskItem, setTaskItem] = useState([]);

  function createNewTask(taskName) {
    if (!taskItem.find((t) => t.name === taskName)) {
      setTaskItem([...taskItem, { name: taskName, done: false }]);
    }
  }
  const [showCompleted, setShowCompleted] = useState(false);
  const toggleTask = (task) => {
    setTaskItem(
      taskItem.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItem(JSON.parse(data));
    }
  }, []);

  const cleanTasks = () => {
    setTaskItem(taskItem.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItem));
  }, [taskItem]);

  return (
    <main className="bg-dark vh-100 text-white">
      .
      <div className="container p-4 col-md-4 offset-md-4">
        <TaskCreator createNewTask={createNewTask} title={25} />
        <TaskTable tasks={taskItem} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(cheked) => setShowCompleted(cheked)}
          cleanTasks={cleanTasks}
        />

        {showCompleted === true && (
          <TaskTable
            tasks={taskItem}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </div>
    </main>
  );
}

export default App;
