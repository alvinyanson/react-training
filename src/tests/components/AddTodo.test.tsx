import AddTodo from '@/components/AddTodo'
import { fireEvent, render, screen } from '@testing-library/react'

describe('AddTodo Component', () => {
  it('renders input and button', () => {
    render(<AddTodo handleAddTodo={vi.fn()} />)

    expect(screen.getByPlaceholderText('Add new task...')).toBeInTheDocument()
    expect(screen.getByText('Add Task')).toBeInTheDocument()
  })

  it('calls handleAddTodo when input is valid', () => {
    const mockHandleAddTodo = vi.fn()
    render(<AddTodo handleAddTodo={mockHandleAddTodo} />)

    const input = screen.getByPlaceholderText('Add new task...')
    const button = screen.getByText('Add Task')

    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(button)

    expect(mockHandleAddTodo).toHaveBeenCalledWith('New Task')
    expect(input).toHaveValue('')
  })

  it('shows alert if input is empty', () => {
    window.alert = vi.fn()
    render(<AddTodo handleAddTodo={vi.fn()} />)

    const button = screen.getByText('Add Task')
    fireEvent.click(button)

    expect(window.alert).toHaveBeenCalledWith('Task name is required.')
  })
})
