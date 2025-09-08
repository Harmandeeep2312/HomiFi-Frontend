
import React,  { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "./AuthContent";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/signup", form);
      setIsLoggedIn(true);
      setUser({ username: form.username, email: form.email });
      navigate("/");
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and start your journey 🚀</p>
        {error && <p className="error">{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="username" onChange={handleChange} required />
            <label>Username</label>
          </div>
          <div className="input-group">
            <input type="email" name="email" onChange={handleChange} required />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" onChange={handleChange} required />
            <label>Password</label>
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
