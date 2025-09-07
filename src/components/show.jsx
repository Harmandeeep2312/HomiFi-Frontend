import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";
import Navbar from "./navbar.jsx";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showBlog, setShowBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
   const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [commentData, setCommentData] = useState({comment: ""});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    const fetchBlogData = async () => {
      try {
        const res = await api.get(`/blog/${id}`, { withCredentials: true });
        if (!res.data || res.data.error) {
          throw new Error(res.data?.error || "Blog not found");
        }
        setShowBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      }
    };

    fetchBlogData();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!showBlog) return <p>Loading...</p>;

  const isAuthor =
    currentUser &&
    showBlog.author &&
    (currentUser._id === showBlog.author._id ||
      currentUser.username === showBlog.author.username);

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
      alert(
        "Error deleting blog: " + (err.response?.data?.message || err.message)
      );
    }
  };
  const handleInput = (event)=>{
    const {comment} = event.target;
    setCommentData((prev)=>({
      ...prev,
      [name]:value
    })
    )
  };

  return (
    <>
    <Navbar />
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
          <Typography
            variant="h4"
            component="div"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {showBlog.title}
          </Typography>

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

          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {showBlog.content}
          </Typography>
        </CardContent>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            component={Link}
            to="/"
            size="large"
            variant="contained"
            color="secondary"
          >
            Back to Home
          </Button>
        </Box>
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
      </Card>
    </Box>
      <div className="Review-Box">
        <h3>Hope You Enjoyed Our Blog!!</h3>
        <p>Please Help Us Improve By Providing Us Your Valuable Comment On How We Can Improve</p>
     <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div className="comment-box">
        <TextField
          id="standard-multiline-flexible"
          label="Comment!"
          placeholder="Your Review Matters!"
          multiline
          maxRows={4}
          variant="standard"
          value={commentData.comment}
          name="comment"
          onChange={handleInput}
        /></div>
    </Box>
    </div>
    </>
  );
}
