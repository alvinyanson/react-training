import Task from '@/components/Task'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Task Component', () => {
  const mockOnChangeTodo = vi.fn()
  const mockOnDeleteTodo = vi.fn()
  const todo = { id: 1, title: 'Test Todo', done: false }

  it('renders task data correctly', () => {
    render(<Task todo={todo} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />)

    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls onChangeTodo when checkbox is clicked', () => {
    render(<Task todo={todo} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockOnChangeTodo).toHaveBeenCalledWith({ ...todo, done: true })
  })

  it('enters edit mode and updates title', () => {
    render(<Task todo={todo} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />)

    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    const input = screen.getByDisplayValue('Test Todo')
    fireEvent.change(input, { target: { value: 'Updated Todo' } })

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockOnChangeTodo).toHaveBeenCalledWith({ ...todo, title: 'Updated Todo' })
  })

  it('calls onDeleteTodo when delete is confirmed', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<Task todo={todo} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />)

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockOnDeleteTodo).toHaveBeenCalledWith(todo.id)
    confirmSpy.mockRestore()
  })
})
