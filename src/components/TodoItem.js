import React from 'react'

const TodoItem = ({todo,onEditClick,onDelete}) => {
  return (
        <li key={todo.id}>
            {todo.text}
          <button onClick={() => onEditClick(todo)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
  )

}

export default TodoItem
