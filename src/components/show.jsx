import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  let [showBlog, setShowBlog] = useState(null);
  let [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    const fetchBlogData = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        console.log("API response:", res.data);
        setShowBlog(res.data);
        console.log("ShowBlog Data:", res.data.blog); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!showBlog) return <p>Loading...</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blog/${id}`);
      alert("Blog deleted successfully");
      navigate("/");
    } catch (err) {
      alert(
        "Error deleting blog: " + (err.response?.data?.message || err.message)
      );
    }
  };

  console.log("Blog author:", blog.author);
console.log("Current user:", user);
  const isAuthor =
    currentUser &&
    showBlog.author &&
    (currentUser._id === showBlog.author._id ||
      currentUser.username === showBlog.author.username);

  const formattedDate = showBlog.createdAt
    ? new Date(showBlog.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 2,
        py: 10,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 3,
          borderRadius: 3,
          boxShadow: 5,
          bgcolor: "white",
        }}
      >
        <CardContent>
          {/* Author */}
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              fontSize: 14,
              mb: 1,
            }}
          >
            <PersonIcon fontSize="small" />{" "}
            {showBlog.author?.username || "Anonymous"}
          </Typography>

          {/* Title */}
          <Typography
            variant="h4"
            component="div"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {showBlog.title}
          </Typography>

          {/* Date */}
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              mb: 3,
            }}
          >
            <CalendarTodayIcon fontSize="small" /> {formattedDate}
          </Typography>

          {/* Content */}
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {showBlog.content}
          </Typography>
        </CardContent>

        {/* Back button */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            component={Link}
            to="/"
            size="large"
            variant="contained"
            color="secondary"
          >
            ← Back to Home
          </Button>
        </Box>

        {/* Author actions */}
        {isAuthor && (
          <CardActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
            <Button
              component={Link}
              to={`/blog/${id}/edit`}
              size="large"
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              size="large"
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
