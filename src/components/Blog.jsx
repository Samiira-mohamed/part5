import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
    }
  }

  const blogUsername = blog.user
    ? (blog.user.username || blog.user)
    : null

  const showDelete = currentUser && blogUsername &&
    blogUsername === currentUser.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.user && (blog.user.name || blog.user)}</div>
          {showDelete && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog