import React, { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "./AuthContent";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; 
import "./login.css";

export default function Login() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      setUser({ username: form.username });
      navigate(res.data.redirectUrl || "/");
    } catch (err) {
      if (err.response?.status === 401) {
    alert("Invalid username or password");
  } else {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
}
  }


  const handleGoogleLogin = () => {
    window.location.href = "https://homifi-backend.onrender.com/auth/google";
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-button"
        >
          <FcGoogle size={22} style={{ marginRight: "8px" }} />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
