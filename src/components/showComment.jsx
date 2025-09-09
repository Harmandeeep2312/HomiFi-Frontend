import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Rating,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ShowComments({ blogId, refresh }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/blog/${blogId}`, {
          withCredentials: true,
        });

        
        const blogComments = Array.isArray(res.data.comments)
          ? res.data.comments
          : [];
        setComments(blogComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setComments([]); 
      }
    };

    fetchComments();
  }, [blogId, refresh]);

  if (!comments || comments.length === 0) {
    return (
      <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
        No comments yet. Be the first to leave one!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {comments.map((cmt, index) => (
        <Card
          key={cmt._id || index} 
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "white",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                <CalendarTodayIcon fontSize="small" />
                {cmt.date
                  ? new Date(cmt.date).toLocaleDateString()
                  : "Unknown date"}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1 }}>
              {cmt.comment || "No comment content"}
            </Typography>

            {cmt.rating != null && (
              <Rating value={cmt.rating} precision={0.5} readOnly size="small" />
            )}
          </CardContent>

          {index < comments.length - 1 && <Divider />}
        </Card>
      ))}
    </Box>
  );
}
