import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2>Edit Blog</h2>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputs}
        sx={{ width: "600px", marginBottom: 2 }}
      />
      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleInputs}
        multiline
        minRows={5}
        sx={{ width: "600px", marginBottom: 2 }}
      />
      <Button type="submit" variant="contained">Update</Button>
    </Box>
  );
}
