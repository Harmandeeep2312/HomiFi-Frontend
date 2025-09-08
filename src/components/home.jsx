import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import "./home.css";
import Navbar from "./navbar.jsx";
import api from "../api";
import { Link } from "react-router-dom";


export default function Home() {
  let [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blog");
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-container">
        {blog.map((blogs) => (
          <Card key={blogs._id} className="blog-card">
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 13 }}
              >
                {blogs.author?.username || "Anonymous"}
              </Typography>

              <Typography variant="h5" component="div" className="blog-title">
                {blogs.title}
              </Typography>

              <Typography variant="body2" className="blog-text">
                {blogs.content.length > 150
                  ? blogs.content.slice(0, 150) + "..."
                  : blogs.content}
              </Typography>

              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  component={Link}
                  to={`/blog/${blogs._id}`}
                  size="small"
                  variant="outlined"
                  className="read-more-btn"
                >
                  Read More →
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
