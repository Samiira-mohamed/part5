import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleCreateBlog({ title, author, url })
    navigate('/')
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>create new blog</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            create
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default CreateBlog