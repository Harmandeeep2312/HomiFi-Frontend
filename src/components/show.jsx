import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "./AuthContent";
import api from "../api";
import { Box, Card, CardContent, CardActions, Button, Typography, TextField, Rating } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import ShowComments from "./showComment";

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

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showBlog, setShowBlog] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [commentData, setCommentData] = useState({ comment: "" });
  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blog/${id}`);
        setShowBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found or error fetching blog.");
      }
    };
    fetchBlog();
  }, [id, refreshReviews]);

  if (error) return <p>{error}</p>;
  if (!showBlog) return <p>Loading...</p>;

  const formattedDate = showBlog.date ? new Date(showBlog.date).toLocaleDateString() : "Unknown date";

  const handleInput = (event) => {
    setCommentData({ comment: event.target.value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const review = {
        comment: commentData.comment,
        rating: value,
      };

      await api.post(`/blog/${id}/review`, review, { withCredentials: true }); // send cookies

      alert("Thanks for your feedback!");
      setCommentData({ comment: "" });
      setValue(0);
      setRefreshReviews((prev) => !prev);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review");
    }
  };

  return (
    <Box sx={{ width: "100%", py: 6, px: 2 }}>
      <Card sx={{ maxWidth: 800, mx: "auto", p: 3, borderRadius: 3, boxShadow: 5, bgcolor: "white" }}>
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
      </Card>

      <Card sx={{ maxWidth: 800, mx: "auto", mt: 6, p: 3, borderRadius: 3, boxShadow: 4, bgcolor: "white" }}>
        <Typography variant="h6" gutterBottom>
          Leave a Review
        </Typography>

        {user ? (
          <Box component="form" onSubmit={handleSubmitReview}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => setValue(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
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
        <ShowComments blogId={id} refresh={refreshReviews} />
      </Card>
    </Box>
  );
}
