import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/login">login</Link> &nbsp;
      {user && (
        <span>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </span>
      )}
    </nav>
  )
}

export default NavBar