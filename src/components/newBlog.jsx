import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Navbar from './navbar';
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

export default function NewBlog() {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    title: "",
    content: "",
    Btype: "", 
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("/blog/new", formData);
      alert("Blog created: " + res.data.title);
      setFormData({ title: "", content: "", Btype: "" });
      navigate("/");
    } catch (err) {
      alert("Error creating blog: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundSize: "400% 400%",
          animation: "gradientBG 12s ease infinite",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          Welcome to Blog Creation
        </h2>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '800px',
              backgroundColor: "#fff",
              maxWidth: "95%",
              borderRadius: 2,
              boxShadow: 3,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.2)"
          }}
        >
          
          <TextField
            label="Title"
            placeholder="Enter the title of your blog"
            value={formData.title}
            onChange={handleInputs}
            name="title"
            variant="filled"
            required
          />

         
          <TextField
            label="Content"
            placeholder="Write your blog content"
            value={formData.content}
            onChange={handleInputs}
            name="content"
            multiline
            minRows={8}
            variant="filled"
            required
            sx={{ '& .MuiInputBase-root': { minHeight: 150 } }}
          />

          
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              width: '800px',
              maxWidth: "95%",
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
            }}
            required
          >
            <InputLabel>Blog Category</InputLabel>
            <Select
              name="Btype"
              value={formData.Btype}
              onChange={handleInputs}
            >
              <MenuItem value="General Lifestyle & Personal">
                General Lifestyle & Personal
              </MenuItem>
              <MenuItem value="Technology & Business">
                Technology & Business
              </MenuItem>
              <MenuItem value="Creative & Entertainment">
                Creative & Entertainment
              </MenuItem>
              <MenuItem value="Education & Knowledge">
                Education & Knowledge
              </MenuItem>
            </Select>
          </FormControl>

          
          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#2575fc",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#6a11cb")}
            onMouseOut={(e) => (e.target.style.background = "#2575fc")}
          >
            Submit
          </button>
        </Box>
      </div>
    </>
  );
}
