import React, { useState, useEffect } from "react";
import api from "../api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function ShowComments({ blogId, refresh }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments whenever blogId or refresh changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${blogId}/reviews`, { withCredentials: true });
        setComments(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching comments");
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId, refresh]);

  if (loading) return <Typography>Loading comments...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (comments.length === 0) return <Typography>No comments yet.</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
      {comments.map((comment) => (
        <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {comment.author || "Anonymous"}:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {comment.comment}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Rating: {comment.rating} ⭐
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
