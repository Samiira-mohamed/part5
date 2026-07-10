import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Alert, Container } from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import NavBar from './components/NavBar'
import BlogList from './components/BlogList'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const Notification = ({ message, type }) => {
  if (message === null) return null
  return (
    <Alert severity={type === 'error' ? 'error' : 'success'} sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const navigate = useNavigate()
  const blogFormRef = useRef()

  const showNotification = (message, type = 'success') => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showNotification(`Welcome ${user.name}!`, 'success')
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
      navigate('/')
    } catch {
      showNotification('error creating blog', 'error')
    }
  }

  const handleLike = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
      setBlogs(blogs.map(blog =>
        blog.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : blog
      ))
    } catch {
      showNotification('error updating blog', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showNotification('blog removed successfully', 'success')
    } catch {
      showNotification('error removing blog', 'error')
    }
  }

  return (
    <Container>
      <NavBar user={user} handleLogout={handleLogout} />
      <Notification message={notification} type={notificationType} />

      <Routes>
        <Route path="/" element={
          <div>
            <BlogList blogs={blogs} />
            {user && (
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <CreateBlog handleCreateBlog={handleCreateBlog} />
              </Togglable>
            )}
          </div>
        } />
        <Route path="/blogs/:id" element={
          <BlogPage
            blogs={blogs}
            handleLike={handleLike}
            handleDelete={handleDelete}
            currentUser={user}
          />
        } />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/create" element={
          user ? <CreateBlog handleCreateBlog={handleCreateBlog} /> : <LoginPage handleLogin={handleLogin} />
        } />
      </Routes>
    </Container>
  )
}

export default App