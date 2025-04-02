import { TaskListProps, Todo } from '@/type/todo'
import Task from './Task'

function TaskList({ todos, onChangeTodo, onDeleteTodo }: TaskListProps) {
  return (
    <>
      <div className="card">
        <div className="card-body">
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
              {todos
                .slice()
                .reverse()
                .map((todo: Todo) => (
                  <Task
                    key={todo.id}
                    todo={todo}
                    onChangeTodo={onChangeTodo}
                    onDeleteTodo={onDeleteTodo}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TaskList
