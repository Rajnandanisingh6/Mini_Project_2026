import React from "react";

function Dashboard({ stats }) {
  const cards = [
    { label: "Total Tasks", value: stats.total, icon: "📁", color: "blue" },
    { label: "Completed", value: stats.completed, icon: "✅", color: "green" },
    { label: "In Progress", value: stats.inProgress, icon: "⚡", color: "yellow" },
    { label: "Pending", value: stats.pending, icon: "🕐", color: "purple" },
    { label: "Overdue", value: stats.overdue, icon: "🚨", color: "red" },
  ];

  const completionPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="stat-cards">
        {cards.map((c) => (
          <div key={c.label} className={`stat-card stat-${c.color}`}>
            <span className="stat-icon">{c.icon}</span>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="overall-progress-bar">
        <div className="progress-bar-label">
          <span>Overall Completion</span>
          <span>{completionPct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill overall" style={{ width: `${completionPct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
