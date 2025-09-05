import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "./AuthContent";
import { useNavigate } from "react-router-dom";
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
      const res = await api.post("/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      setUser({ username: form.username });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
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
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
