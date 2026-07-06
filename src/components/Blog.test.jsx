import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('blog url and likes are shown when view button is clicked', async () => {
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

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('http://testurl.com')
  expect(url).toBeDefined()

  const likes = screen.getByText('likes 5', { exact: false })
  expect(likes).toBeDefined()
})
test('clicking like button twice calls event handler twice', async () => {
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

  const mockLike = vi.fn()

  render(
    <Blog
      blog={blog}
      handleLike={mockLike}
      handleDelete={() => {}}
      currentUser={{ username: 'testuser' }}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})