import TaskList from '@/components/TaskList'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Task Component', () => {
  const mockOnChangeTodo = vi.fn()
  const mockOnDeleteTodo = vi.fn()
  const todos = [
    { id: 1, title: 'Task 1', done: false },
    { id: 2, title: 'Task 2', done: true },
  ]

  it('renders tasks in reverse order', () => {
    render(
      <TaskList todos={todos} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />
    )

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Task 2')
    expect(rows[2]).toHaveTextContent('Task 1')
  })

  it('calls onChangeTodo when task changes', () => {
    render(
      <TaskList todos={todos} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />
    )

    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)

    expect(mockOnChangeTodo).toHaveBeenCalled()
  })

  it('calls onDeleteTodo when task is deleted', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(
      <TaskList todos={todos} onChangeTodo={mockOnChangeTodo} onDeleteTodo={mockOnDeleteTodo} />
    )

    const deleteButton = screen.getAllByText('Delete')[0]
    fireEvent.click(deleteButton)

    expect(mockOnDeleteTodo).toHaveBeenCalledWith(2)
    confirmSpy.mockRestore()
  })
})
