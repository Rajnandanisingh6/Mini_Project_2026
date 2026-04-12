import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // --- SAHI HANDLESUBMIT (Axios ke saath) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.email || !form.password) return setError("Email and password are required.");
    if (isSignup && !form.name) return setError("Please enter your name.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    
    setError("");

    try {
      // Backend connection points
      const endpoint = isSignup 
        ? "https://mini-project-2026-1.onrender.com" 
        : "https://mini-project-2026-1.onrender.com";
      
      const response = await axios.post(endpoint, form);

      if (response.status === 200 || response.status === 201) {
     alert(isSignup ? "🚀 Signup Successful!" : "🔑 Login Successful!");

     localStorage.setItem("token", response.data.token); // Agar token mile backend se, toh store kar lo

    setTimeout(() => {
    onLogin(form.name || form.email.split("@")[0]);
  }, 100);
}


    } catch (err) {
      // Agar backend band ho ya error aaye
      console.error("Error:", err);
      setError(err.response?.data?.message || "Server se connect nahi ho paya. Backend chalu karein!");
    }
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
            type="button"
            className={`toggle-btn ${!isSignup ? "active" : ""}`}
            onClick={() => { setIsSignup(false); setError(""); }}
          >
            Login
          </button>
          <button
            type="button"
            className={`toggle-btn ${isSignup ? "active" : ""}`}
            onClick={() => { setIsSignup(true); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="form-error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

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