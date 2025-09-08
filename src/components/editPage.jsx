import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Navbar from "./navbar";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        setFormData({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blog/${id}`, formData);
      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      alert("Error updating blog: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          Edit Blog
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputs}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleInputs}
            multiline
            minRows={6}
            fullWidth
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#1976d2",
              },
            }}
          >
            Update Blog
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

