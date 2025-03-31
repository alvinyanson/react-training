import { useState } from 'react'
import { TaskItemProps } from '../types/todo'

function Task({ todo, onChangeTodo, onDeleteTodo }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleConfirmDeleteTodo = (id: number) => {
    if (confirm('Confirm delete todo?')) {
      onDeleteTodo(id)
    }
  }

  let todoContent

  if (isEditing) {
    todoContent = (
      <>
        <td>
          <input
            className="form-control"
            value={todo.title}
            onChange={(e) => {
              onChangeTodo({
                ...todo,
                title: e.target.value,
              })
            }}
          />
        </td>
        <td>
          <button onClick={() => setIsEditing(false)} className="btn btn-dark">
            Save
          </button>
        </td>
      </>
    )
  } else {
    todoContent = (
      <>
        <td className={todo.done ? 'text-decoration-line-through' : ''}>{todo.title}</td>
        <td>
          <button onClick={() => setIsEditing(true)} className="btn btn-light">
            {' '}
            Edit
          </button>
        </td>
      </>
    )
  }

  return (
    <>
      <tr>
        <th>{todo.id}</th>
        <td>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.done}
              onChange={(e) => {
                onChangeTodo({
                  ...todo,
                  done: e.target.checked,
                })
              }}
            />
          </div>
        </td>
        {todoContent}
        <td>
          <button className="btn btn-dark" onClick={() => handleConfirmDeleteTodo(todo.id)}>
            {' '}
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default Task
