import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library', {exact: false})
  // const element2 = await screen.findByText('Component testing is done with react-testing-library')
  const element3 = screen.queryByText('do not want this thing to be rendered')
  screen.debug(element)

  expect(element).toBeDefined()
  expect(element3).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
