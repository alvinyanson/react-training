import { useState } from 'react'
import AddTodo from './components/AddTodo';
import TaskList from './components/TaskList';

const initialTodos = [
  { id: 1, title: 'Go grocery shopping', done: false },
  { id: 2, title: 'Finish project report', done: false },
  { id: 3, title: 'Call mom', done: true },
  { id: 4, title: 'Schedule dentist appointment', done: false },
  { id: 5, title: 'Workout for 30 minutes', done: true },
  { id: 6, title: 'Reply to emails', done: false },
  { id: 7, title: 'Pay electricity bill', done: false },
  { id: 8, title: 'Cook dinner', done: true },
  { id: 9, title: 'Read 10 pages of a book', done: false },
  { id: 10, title: 'Clean the living room', done: true },
];


function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (title) => {
    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map(todo => todo.id), 0) + 1,
        title: title,
        done: false
      },
    ])
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleChangeTodo = (updatedTodo) => {
    setTodos(todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      else {
        return todo;
      }
    }))
  }

  return (
    <>
      <div className="container py-5 py-2">
        <div className='row justify-content-center mb-3'>
          <div className='col-md-6 col-12'>
            <AddTodo handleAddTodo={handleAddTodo} />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-6 col-12'>
            <TaskList todos={todos} onDeleteTodo={handleDeleteTodo} onChangeTodo={handleChangeTodo} />
          </div>
        </div>
      </div >
    </>
  )
}

export default App
