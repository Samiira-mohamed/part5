import { useParams, useNavigate } from 'react-router-dom'

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

  const showDelete = currentUser && blog.user &&
    (blog.user.username === currentUser.username ||
     blog.user === currentUser.username)

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        {currentUser && (
          <button onClick={likeBlog}>like</button>
        )}
      </div>
      <div>added by {blog.user && (blog.user.name || blog.user)}</div>
      {showDelete && (
        <button onClick={deleteBlog}>remove</button>
      )}
    </div>
  )
}

export default BlogPage