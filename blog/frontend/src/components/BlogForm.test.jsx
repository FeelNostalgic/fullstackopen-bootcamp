import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls the event handler with the right details when a new blog is created', async () => {
    // Create a mock handler function
    const mockHandler = vi.fn()
    
    // Render the BlogForm component with the mock handler
    const { container } = render(<BlogForm newBlog={mockHandler} />)
    
    // Find the input fields
    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    
    // Fill in the form fields
    await userEvent.type(titleInput, 'Test Blog Title')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'https://test.com')
    
    // Find and click the submit button
    const submitButton = screen.getByText('create')
    await userEvent.click(submitButton)
    
    // Check that the handler was called with the correct details
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://test.com'
    })
    
    // Check that the form fields are cleared after submission
    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
  })
})

