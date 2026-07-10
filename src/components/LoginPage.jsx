import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>Log in to application</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            login
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage