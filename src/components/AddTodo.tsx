import { useState } from 'react'
import { AddTodoProps } from '@/type/todo'

function AddTodo({ handleAddTodo }: AddTodoProps) {
  const [task, setTask] = useState('')

  const handleSubmitTask = () => {
    if (!task) {
      alert('Task name is required.')
      return
    }

    handleAddTodo(task)
    setTask('')
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form className="row">
            <div className="col-md-9 col-12">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="form-control"
                placeholder="Add new task..."
              />
            </div>
            <div className="col-md-3 col-12">
              <button type="button" onClick={handleSubmitTask} className="btn btn-dark w-100">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodo
