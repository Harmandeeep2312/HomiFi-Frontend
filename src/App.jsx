import './App.css'
import Home from "./components/home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Show from "./components/show.jsx";
import NewBlog from "./components/newBlog.jsx";
import EditPage from './components/editPage.jsx';
import React, { AuthProvider } from "./components/AuthContent";
import Dashboard from "./components/Dashboard";




function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog/new" element={<NewBlog />} />
        <Route path="/blog/:id" element={<Show />} />
        <Route path="/blog/:id/edit" element={<EditPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
