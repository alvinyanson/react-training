export type AddTodoProps = {
  handleAddTodo: (todo: string) => void
}

export type TaskListProps = TaskProps & {
  todos: Todo[]
}

export type TaskItemProps = TaskProps & {
  todo: Todo
}

export type TaskProps = {
  onChangeTodo: (todo: Todo) => void
  onDeleteTodo: (id: number) => void
}

export type Todo = {
  id: number
  title: string
  done: boolean
}
