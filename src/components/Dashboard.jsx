import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { AuthContext } from "./AuthContent";
import api from "../api";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await api.get(`/user/${user._id}/dashboard`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserBlogs();
    }
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        {user?.username}’s Dashboard
      </Typography>

      {blogs.length === 0 ? (
        <Card
          sx={{
            mt: 4,
            p: 3,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <LibraryBooksIcon
              sx={{ fontSize: 60, color: "grey.500", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              No Blogs Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven’t uploaded any blogs yet. Start writing and share your
              ideas with the world!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Blog Title</TableCell>
                <TableCell align="center">Average Rating</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Created At</TableCell>
              </TableRow>
            </TableHead>
           <TableBody>
              {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                     <TableCell>{blog.title}</TableCell>
                      <TableCell align="center">{blog.rating || 0} ⭐</TableCell>
                      <TableCell align="center">{blog.comments}</TableCell>
                      <TableCell align="center">
                      {new Date(blog.createdAt).toLocaleDateString()}
                      </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
