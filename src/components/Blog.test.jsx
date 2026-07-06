import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockHandler = () => {}

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleDelete={mockHandler}
      currentUser={{ username: 'testuser' }}
    />
  )

  const title = screen.getByText('Test Blog Title Test Author', { exact: false })
  expect(title).toBeDefined()

  const url = screen.queryByText('http://testurl.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes 5', { exact: false })
  expect(likes).toBeNull()
})