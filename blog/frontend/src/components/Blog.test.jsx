import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders blog title and author by default, but not URL or likes', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: {
        username: 'testuser'
      }
    }
    
    const mockUser = {
      username: 'testuser'
    }
    
    render(<Blog blog={blog} user={mockUser} />)
    
    // Check that title and author are rendered
    expect(screen.queryByText('Test Blog')).toBeDefined()
    expect(screen.queryByText('Test Author')).toBeDefined()
    
    // Check that URL and likes are not rendered by default
    expect(screen.queryByText('https://test.com')).toBeNull()
    expect(screen.queryByText('likes 5')).toBeNull()
  })

  test('shows URL and likes when view button is clicked', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5,
      user: {
        username: 'testuser'
      }
    }
    
    const mockUser = {
      username: 'testuser'
    }
    
    render(<Blog blog={blog} user={mockUser} />)
    
    // Click the view button
    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)
    
    // Check that URL and likes are now rendered
    expect(screen.queryByText('https://test.com')).toBeDefined()
    expect(screen.queryByText('likes 5')).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 5, 
      user: {
        username: 'testuser'
      }
    }

    const mockUser = {
      username: 'testuser'
    }
    
    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={mockUser} sendLike={mockHandler} />)
    
    // First, we need to click the view button to show the like button
    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)
    
    // Now we can click the like button
    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
