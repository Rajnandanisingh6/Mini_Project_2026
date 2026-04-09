import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import TaskForm from "./TaskForm.jsx";

function TaskList({ tasks, updateProgress, deleteTask, editTask, getDaysLeft }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const filters = ["All", "Pending", "In Progress", "Completed", "Overdue"];

  const filtered = tasks.filter((t) => {
    const daysLeft = getDaysLeft(t.deadline);
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filter === "All") return true;
    if (filter === "Completed") return t.progress === 100;
    if (filter === "Pending") return t.progress === 0;
    if (filter === "In Progress") return t.progress > 0 && t.progress < 100;
    if (filter === "Overdue") return daysLeft < 0 && t.progress < 100;
    return true;
  });

  if (editingTask) {
    return (
      <TaskForm
        prefill={editingTask}
        editTask={(updated) => { editTask(updated); setEditingTask(null); }}
        onDone={() => setEditingTask(null)}
      />
    );
  }

  return (
    <div className="task-list-section">
      <div className="list-controls">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span>📭</span>
          <p>No tasks found. Try a different filter or add a new task.</p>
        </div>
      ) : (
        <div className="task-grid">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              daysLeft={getDaysLeft(task.deadline)}
              updateProgress={updateProgress}
              deleteTask={deleteTask}
              onEdit={() => setEditingTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
