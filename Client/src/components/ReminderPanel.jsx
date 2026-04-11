import React from "react";

function ReminderPanel({ reminders }) {
  if (reminders.length === 0) {
    return (
      <div className="reminder-panel">
        <h2>🔔 Reminders</h2>
        <div className="empty-state">
          <span>🎉</span>
          <p>No upcoming deadlines in the next 3 days. You're all good!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reminder-panel">
      <h2>🔔 Upcoming Deadlines</h2>
      <div className="reminder-list">
        {reminders.map((task) => {
          const urgency =
            task.daysLeft < 0 ? "overdue" : task.daysLeft === 0 ? "today" : "soon";
          const label =
            task.daysLeft < 0
              ? `Overdue by ${Math.abs(task.daysLeft)} day(s)`
              : task.daysLeft === 0
              ? "Due Today!"
              : `Due in ${task.daysLeft} day(s)`;

          return (
            <div key={task.id} className={`reminder-item reminder-${urgency}`}>
              <div className="reminder-icon">
                {urgency === "overdue" ? "🚨" : urgency === "today" ? "⚠️" : "🕐"}
              </div>
              <div className="reminder-info">
                <div className="reminder-title">{task.title}</div>
                <div className="reminder-meta">
                  {task.category} · {task.deadline}
                </div>
              </div>
              <div className="reminder-badge">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReminderPanel;
