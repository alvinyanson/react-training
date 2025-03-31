import { useState } from 'react'
import AddTodo from './components/AddTodo'
import TaskList from './components/TaskList'
import { Todo } from './types/todo'
import { initialTodos } from './data/dummyTodo'

function App() {
  const [todos, setTodos] = useState(initialTodos)

  const handleAddTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map((todo) => todo.id), 0) + 1,
        title: title,
        done: false,
      },
    ])
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleChangeTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo
        } else {
          return todo
        }
      })
    )
  }

  return (
    <>
      <div className="container py-5 py-2">
        <div className="row justify-content-center mb-3">
          <div className="col-md-6 col-12">
            <AddTodo handleAddTodo={handleAddTodo} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-12">
            <TaskList
              todos={todos}
              onDeleteTodo={handleDeleteTodo}
              onChangeTodo={handleChangeTodo}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
