import React, { useState } from 'react'

function Task({ todo, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleConfirmDeleteTodo = (id) => {
        if (confirm('Confirm delete todo?')) {
            onDelete(id);
        }
    }

    let todoContent;

    if (isEditing) {
        todoContent = (
            <>
                <td>
                    <input
                        className='form-control'
                        value={todo.title}
                        onChange={e => {
                            onChange({
                                ...todo,
                                title: e.target.value
                            });
                        }} />
                </td>
                <td>
                    <button onClick={() => setIsEditing(false)} className='btn btn-dark'>
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
                    <button onClick={() => setIsEditing(true)} className='btn btn-light'> Edit</button>
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
                        <input className="form-check-input" type="checkbox" checked={todo.done}
                            onChange={e => {
                                onChange({
                                    ...todo,
                                    done: e.target.checked
                                })
                            }} />
                    </div>
                </td>
                {todoContent}
                <td>
                    <button className='btn btn-dark' onClick={() => handleConfirmDeleteTodo(todo.id)}> Delete</button>
                </td>
            </tr>
        </>
    )
}

export default Task