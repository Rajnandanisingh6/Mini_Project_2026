import React, { useState } from "react";

const empty = {
  title: "",
  description: "",
  category: "Academic",
  priority: "Medium",
  deadline: "",
  reminder: "1 day before",
};

function TaskForm({ addTask, onDone, prefill, editTask }) {
  const [form, setForm] = useState(prefill || empty);
  const [error, setError] = useState("");

  const isEdit = !!prefill;

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Task title is required.");
    if (!form.deadline) return setError("Please set a deadline.");
    setError("");

    if (isEdit) {
      editTask({ ...form });
    } else {
      addTask({ id: Date.now(), ...form, progress: 0 });
    }
    setForm(empty);
    if (onDone) onDone();
  };

  return (
    <div className="form-card">
      <h2 className="form-title">{isEdit ? "✏️ Edit Task" : "➕ Create New Task"}</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Task Title *</label>
          <input type="text" placeholder="e.g. Complete DAA Assignment" value={form.title} onChange={set("title")} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Add details about this task..." value={form.description} onChange={set("description")} rows={3} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={set("category")}>
              <option>Academic</option>
              <option>Project</option>
              <option>Personal</option>
              <option>Work</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select value={form.priority} onChange={set("priority")} className={`priority-select priority-${form.priority.toLowerCase()}`}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Deadline *</label>
            <input type="date" value={form.deadline} onChange={set("deadline")} />
          </div>

          <div className="form-group">
            <label>Reminder</label>
            <select value={form.reminder} onChange={set("reminder")}>
              <option>2 hours before</option>
              <option>1 day before</option>
              <option>2 days before</option>
              <option>3 days before</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          {isEdit ? "💾 Save Changes" : "✅ Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
