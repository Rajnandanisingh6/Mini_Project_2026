import React, { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ReminderPanel from "./components/ReminderPanel";
import Dashboard from "./components/Dashboard";

const initialTasks = [
  {
    id: 1,
    title: "Complete DAA assignment",
    description: "Finish heap sort and merge sort questions.",
    category: "Academic",
    priority: "High",
    deadline: "2026-03-18",
    progress: 45,
    reminder: "1 day before",
  },
  {
    id: 2,
    title: "Prepare project synopsis presentation",
    description: "Create slides for Task Tracker project review.",
    category: "Project",
    priority: "Medium",
    deadline: "2026-03-20",
    progress: 70,
    reminder: "2 hours before",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateProgress = (id, value) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, progress: Number(value) } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(deadline);
    dueDate.setHours(0, 0, 0, 0);

    return Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.progress === 100).length;
    const inProgress = tasks.filter(
      (t) => t.progress > 0 && t.progress < 100
    ).length;
    const pending = tasks.filter((t) => t.progress === 0).length;
    const overdue = tasks.filter(
      (t) => getDaysLeft(t.deadline) < 0 && t.progress < 100
    ).length;

    return {
      total: tasks.length,
      completed,
      inProgress,
      pending,
      overdue,
    };
  }, [tasks]);

  const reminders = tasks
    .filter((task) => task.progress < 100)
    .map((task) => ({
      ...task,
      daysLeft: getDaysLeft(task.deadline),
    }))
    .filter((task) => task.daysLeft <= 2)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="app">
      <header className="header">
        <h1>Task Tracker</h1>
        <p>
          A web-based task management system for task creation, deadlines,
          progress tracking, and reminders.
        </p>
      </header>

      <div className="container">
        <div className="left-panel">
          <TaskForm addTask={addTask} />
          <Dashboard stats={stats} />
          <ReminderPanel reminders={reminders} />
        </div>

        <div className="right-panel">
          <TaskList
            tasks={tasks}
            updateProgress={updateProgress}
            deleteTask={deleteTask}
            getDaysLeft={getDaysLeft}
          />
        </div>
      </div>
    </div>
  );
}

export default App;