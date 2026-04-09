import React, { useState } from "react";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError("Email and password are required.");
    if (isSignup && !form.name) return setError("Please enter your name.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    onLogin(form.name || form.email.split("@")[0]);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-card">
        <div className="login-brand">
          <span className="login-icon">✅</span>
          <h1>Task Tracker</h1>
          <p>Manage your tasks, deadlines & progress</p>
        </div>

        <div className="login-toggle">
          <button
            className={`toggle-btn ${!isSignup ? "active" : ""}`}
            onClick={() => { setIsSignup(false); setError(""); }}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${isSignup ? "active" : ""}`}
            onClick={() => { setIsSignup(true); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon-wrap">
                <span className="input-icon">👤</span>
                <input type="text" placeholder="Enter your name" value={form.name} onChange={set("name")} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <span className="input-icon">📧</span>
              <input type="email" placeholder="Enter your email" value={form.email} onChange={set("email")} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-icon-wrap">
              <span className="input-icon">🔒</span>
              <input type="password" placeholder="Enter your password" value={form.password} onChange={set("password")} />
            </div>
          </div>

          <button type="submit" className="btn-submit login-btn">
            {isSignup ? "🚀 Create Account" : "🔑 Login"}
          </button>
        </form>

        <p className="login-footer">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="login-link" onClick={() => { setIsSignup(!isSignup); setError(""); }}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
