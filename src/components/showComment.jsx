
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { Box, Card, CardContent, Typography, Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";

export default function ShowComments() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

   const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/blog/${id}/review/${reviewId}`, { withCredentials: true });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId)); // instantly remove deleted review
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/blog/${id}`, { withCredentials: true });
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id, refresh]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Comments & Reviews
      </Typography>

      {reviews.length > 0 ? (
        reviews.map((rev) => (
          <Card
            key={rev._id}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
              transition: "0.2s",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle2"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <PersonIcon fontSize="small" />
                {rev.author?.username || "Anonymous"}
              </Typography>

              <Rating
                value={rev.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />

              <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
                {rev.comment}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1 }}
              >
                {new Date(rev.createdAt).toLocaleString()}
              </Typography>
               {user && rev.author && user._id === rev.author._id && (
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleDelete(rev._id)}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="text.secondary">
          No reviews yet. Be the first to comment!
        </Typography>
      )}
    </Box>
  );
}
