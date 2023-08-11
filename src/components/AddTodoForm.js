import React from 'react'

const AddTodoForm = (
  {todo,
  onAddFormSubmit,
  onAddInputChange,
  }
) => {
  return (
    <form onSubmit={onAddFormSubmit}>
    <h2>ADD Todo</h2>
    <label htmlFor="todo">ADD Todo</label>
    <input
      type="text"
      name='todo'
      placeholder='create a new todo'
      value={todo}
      onChange={onAddInputChange}
      />
      <button  type='submit'>ADD</button>
  </form>
  )
}

export default AddTodoForm
