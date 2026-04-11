import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic",
    priority: "Medium",
    deadline: "",
    reminder: "1 day before",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.deadline) return;

    const newTask = {
      id: Date.now(),
      ...form,
      progress: 0,
    };

    addTask(newTask);

    setForm({
      title: "",
      description: "",
      category: "Academic",
      priority: "Medium",
      deadline: "",
      reminder: "1 day before",
    });
  };

  return (
    <div className="card">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Academic</option>
          <option>Project</option>
          <option>Personal</option>
          <option>Work</option>
        </select>

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <select
          value={form.reminder}
          onChange={(e) => setForm({ ...form, reminder: e.target.value })}
        >
          <option>2 hours before</option>
          <option>1 day before</option>
          <option>2 days before</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;