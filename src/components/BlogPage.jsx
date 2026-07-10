import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Paper, Divider } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

const BlogPage = ({ blogs, handleLike, handleDelete, currentUser }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find(b => b.id === id)

  if (!blog) return null

  const likeBlog = () => {
    handleLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user._id || blog.user : blog.user
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
      navigate('/')
    }
  }

  const blogUsername = blog.user
    ? (blog.user.username || blog.user)
    : null

  const showDelete = currentUser && blogUsername &&
    blogUsername === currentUser.username

  const userName = blog.user
    ? (blog.user.name || blog.user.username || blog.user)
    : 'unknown'

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 1 }}>
          <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Added by {userName}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6">{blog.likes} likes</Typography>
          {currentUser && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ThumbUpIcon />}
              onClick={likeBlog}
            >
              like
            </Button>
          )}
          {showDelete && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={deleteBlog}
            >
              remove
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default BlogPage