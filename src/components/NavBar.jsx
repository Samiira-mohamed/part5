import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <Link to="/">blogs</Link> &nbsp;
      {user ? (
        <span>
          <Link to="/create">create</Link> &nbsp;
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </span>
      ) : (
        <Link to="/login">login</Link>
      )}
    </nav>
  )
}

export default NavBar