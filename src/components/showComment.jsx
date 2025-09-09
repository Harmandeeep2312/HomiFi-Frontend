import React from "react";
import { Box, Card, CardContent, Divider, Typography, Rating } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function ShowComments({ comments }) {
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
        <Card key={cmt._id || index} sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
          <CardContent>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
              <CalendarTodayIcon fontSize="small" />
              {cmt.date ? new Date(cmt.date).toLocaleDateString() : "Unknown date"} - <b>{cmt.author || "Anonymous"}</b>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {cmt.comment || "No comment content"}
            </Typography>
            {cmt.rating != null && <Rating value={cmt.rating} precision={0.5} readOnly size="small" />}
          </CardContent>
          {index < comments.length - 1 && <Divider />}
        </Card>
      ))}
    </Box>
  );
}
