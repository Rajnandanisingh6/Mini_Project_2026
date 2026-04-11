import React, { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ReminderPanel from "./components/ReminderPanel.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";

const initialTasks = [
  {
    id: 1,
    title: "Complete DAA Assignment",
    description: "Finish heap sort and merge sort questions.",
    category: "Academic",
    priority: "High",
    deadline: "2026-03-18",
    progress: 45,
    reminder: "1 day before",
  },
  {
    id: 2,
    title: "Prepare Project Synopsis",
    description: "Create slides for Task Tracker project review.",
    category: "Project",
    priority: "Medium",
    deadline: "2026-03-20",
    progress: 70,
    reminder: "2 hours before",
  },
  {
    id: 3,
    title: "Submit Lab Report",
    description: "Write and submit the OS lab experiment report.",
    category: "Academic",
    priority: "Low",
    deadline: "2026-03-25",
    progress: 0,
    reminder: "2 days before",
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("tasks");
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={(name) => setUser(name)} />;

  const addTask = (task) => setTasks([task, ...tasks]);

  const updateProgress = (id, value) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, progress: Number(value) } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const editTask = (updated) =>
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));

  const getDaysLeft = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(deadline);
    due.setHours(0, 0, 0, 0);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.progress === 100).length;
    const inProgress = tasks.filter((t) => t.progress > 0 && t.progress < 100).length;
    const pending = tasks.filter((t) => t.progress === 0).length;
    const overdue = tasks.filter((t) => getDaysLeft(t.deadline) < 0 && t.progress < 100).length;
    return { total: tasks.length, completed, inProgress, pending, overdue };
  }, [tasks]);

  const reminders = tasks
    .filter((t) => t.progress < 100)
    .map((t) => ({ ...t, daysLeft: getDaysLeft(t.deadline) }))
    .filter((t) => t.daysLeft <= 3)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <span className="header-icon">✅</span>
            <div>
              <h1>Task Tracker</h1>
              <p>Manage tasks, deadlines & progress — all in one place</p>
            </div>
          </div>
          <div className="header-stats-mini">
            <span className="mini-stat">👋 {user}</span>
            <span className="mini-stat">{stats.total} Total</span>
            <span className="mini-stat overdue-mini">{stats.overdue} Overdue</span>
            <button className="logout-btn" onClick={() => setUser(null)}>Logout</button>
          </div>
        </div>
      </header>

      <nav className="tab-nav">
        {["tasks", "add", "reminders"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "tasks" && "📋 My Tasks"}
            {tab === "add" && "➕ Add Task"}
            {tab === "reminders" && `🔔 Reminders ${reminders.length > 0 ? `(${reminders.length})` : ""}`}
          </button>
        ))}
      </nav>

      <main className="main-content">
        <Dashboard stats={stats} />

        {activeTab === "tasks" && (
          <TaskList
            tasks={tasks}
            updateProgress={updateProgress}
            deleteTask={deleteTask}
            editTask={editTask}
            getDaysLeft={getDaysLeft}
          />
        )}
        {activeTab === "add" && (
          <TaskForm addTask={addTask} onDone={() => setActiveTab("tasks")} />
        )}
        {activeTab === "reminders" && (
          <ReminderPanel reminders={reminders} />
        )}
      </main>
    </div>
  );
}

export default App;
