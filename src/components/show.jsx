import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "./AuthContent";
import api from "../api";
import Navbar from "./navbar.jsx";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  Rating, 
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import ShowComments from "./showComment.jsx";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showBlog, setShowBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [commentData, setCommentData] = useState({ comment: "" });

  
  const fetchBlogAndComments = async () => {
    try {
      const resBlog = await api.get(`/blog/${id}`, { withCredentials: true });
      setShowBlog(resBlog.data);

      const resComments = await api.get(`/blog/${id}/review`, { withCredentials: true });
      setComments(resComments.data.reviews);
    } catch (err) {
      console.error(err);
      setError("Blog not found or error fetching blog/comments.");
    }
  };

  useEffect(() => {
    fetchBlogAndComments();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!showBlog) return <p>Loading...</p>;

  const isAuthor =
    user &&
    showBlog.author &&
    (user._id === showBlog.author._id || user.username === showBlog.author.username);

  const formattedDate = showBlog.date
    ? new Date(showBlog.date).toLocaleDateString()
    : "Unknown date";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blog/${id}`, { withCredentials: true });
      alert("Blog deleted successfully");
      navigate("/");
    } catch (err) {
      alert("Error deleting blog: " + (err.response?.data?.message || err.message));
    }
  };

  const handleInput = (e) => {
    setCommentData({ comment: e.target.value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const review = { comment: commentData.comment, rating: value };
      await api.post(`/blog/${id}/review`, review, { withCredentials: true });

      setCommentData({ comment: "" });
      setValue(0);

     
      const resComments = await api.get(`/blog/${id}/review`, { withCredentials: true });
      setComments(resComments.data.reviews);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review");
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ minHeight: '720px', py: 8 }} />

       <div className="main-content">
      <Box sx={{ width: "100%", py: 113, px: 2, background: "linear-gradient(to right, #6dd5ed, #2193b0)" }}>
        
        <Card sx={{ maxWidth: 800, mx: "auto", p: 6, borderRadius: 3, boxShadow: 5, bgcolor: "white" }}>
          <div className="Cardd">
          <CardContent>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", mb: 1 }}>
              <PersonIcon fontSize="small" /> {showBlog.author?.username || "Anonymous"}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: "bold" }}>
              {showBlog.title}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", mb: 3 }}>
              <CalendarTodayIcon fontSize="small" /> {formattedDate}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {showBlog.content}
            </Typography>
          </CardContent>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button component={Link} to="/" size="large" variant="contained" color="secondary">
              Back to Home
            </Button>
          </Box>

          {isAuthor && (
            <CardActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
              <Button component={Link} to={`/blog/${id}/edit`} size="large" variant="outlined" color="primary">
                Edit
              </Button>
              <Button onClick={handleDelete} size="large" color="error" variant="outlined">
                Delete
              </Button>
            </CardActions>
          )}
          </div>

        </Card>

        <Card sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 3, borderRadius: 3, boxShadow: 4, bgcolor: "white" }}>
          <Typography variant="h6" gutterBottom>
            Leave a Review
          </Typography>
          {user ? (
            <Box component="form" onSubmit={handleSubmitReview}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => setValue(newValue)}
                  onChangeActive={(event, newHover) => setHover(newHover)}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                
              </Box>
              <TextField
                fullWidth
                label="Comment"
                placeholder="Your Review Matters!"
                multiline
                maxRows={4}
                variant="outlined"
                value={commentData.comment}
                onChange={handleInput}
                sx={{ mt: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Review
              </Button>
              
            </Box>
          ) : (
            <Typography sx={{ color: "red", mt: 2 }}>
              You must <Link to="/login">log in</Link> to comment.
            </Typography>
          )}
        </Card>
           

        <Card sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 3, borderRadius: 3, boxShadow: 4, bgcolor: "white" }}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <ShowComments comments={comments} />
        </Card>
      </Box>
      
       </div>
    </>
  );
}
