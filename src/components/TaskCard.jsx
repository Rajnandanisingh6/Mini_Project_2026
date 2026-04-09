import React from "react";

const priorityColor = { High: "red", Medium: "yellow", Low: "green" };
const categoryIcon = { Academic: "🎓", Project: "💼", Personal: "🏠", Work: "💻" };

function TaskCard({ task, daysLeft, updateProgress, deleteTask, onEdit }) {
  const status =
    task.progress === 100 ? "Completed" : task.progress > 0 ? "In Progress" : "Pending";

  const deadlineLabel = () => {
    if (task.progress === 100) return { text: "Completed ✅", cls: "dl-done" };
    if (daysLeft < 0) return { text: `Overdue by ${Math.abs(daysLeft)}d`, cls: "dl-overdue" };
    if (daysLeft === 0) return { text: "Due Today!", cls: "dl-today" };
    if (daysLeft === 1) return { text: "Due Tomorrow", cls: "dl-soon" };
    return { text: `${daysLeft} days left`, cls: "dl-ok" };
  };

  const dl = deadlineLabel();

  return (
    <div className={`task-card priority-border-${priorityColor[task.priority]}`}>
      <div className="card-header">
        <div className="card-meta">
          <span className="category-badge">
            {categoryIcon[task.category] || "📌"} {task.category}
          </span>
          <span className={`priority-badge priority-${priorityColor[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <div className="card-actions">
          <button className="btn-icon edit" onClick={onEdit} title="Edit">✏️</button>
          <button className="btn-icon del" onClick={() => deleteTask(task.id)} title="Delete">🗑️</button>
        </div>
      </div>

      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-footer">
        <div className="deadline-row">
          <span className="deadline-date">📅 {task.deadline}</span>
          <span className={`deadline-label ${dl.cls}`}>{dl.text}</span>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span className={`status-badge status-${status.replace(" ", "-").toLowerCase()}`}>{status}</span>
            <span className="progress-pct">{task.progress}%</span>
          </div>
          <div className="progress-track">
            <div
              className={`progress-fill ${task.progress === 100 ? "done" : daysLeft < 0 ? "overdue" : ""}`}
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={task.progress}
            onChange={(e) => updateProgress(task.id, e.target.value)}
            className="progress-slider"
          />
        </div>

        <div className="reminder-row">🔔 Reminder: {task.reminder}</div>
      </div>
    </div>
  );
}

export default TaskCard;
