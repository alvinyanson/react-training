import React from 'react'
import Task from './Task'

function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Status</th>
                <th scope="col">Task</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                todos.slice().reverse().map(todo => (
                  <Task key={todo.id} todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TaskList