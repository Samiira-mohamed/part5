import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'

const NavBar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/create">
              create
            </Button>
            <Typography sx={{ flexGrow: 1 }} />
            <Typography color="inherit" sx={{ mr: 2 }}>
              {user.name} logged in
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar