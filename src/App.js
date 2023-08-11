import './App.css';
//component import 
import TodoItem from './components/TodoItem';
import AddTodoForm from "./components/AddTodoForm"
import EditForm from './components/EditForm';
//useState import
import React, { useEffect, useState } from 'react';

function App() {
  //todos is the state variable

  //useStateはreturnで返す値によって、初期値を設定することができる。
  const [todos, setTodos] = useState(()=>{
    const saveTodos = localStorage.getItem('todos');
    if (saveTodos) {
      return JSON.parse(saveTodos);
    }
    else {
      return [];
    }

  });
  //need state to keep track of the input
  const [todo, setTodo] = useState('');
  //boolean state to know if we are editing a todo
  const [isEditing, setIsEditing] = useState(false);
  //state to keep track of the todo we are editing
  const [currentTodo, setCurrentTodo] = useState({});
//using useEffect to save the todos to local storage
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  const handleInputChange = (e) => {
    //set the todo state variable to the value of the input 
    setTodo(e.target.value);
  }

  const handleEditInputChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
    console.log(currentTodo);
  }
  //function to create new object 
  const handleFormSubmit = (e) => {
    //prevent the page from refreshing
    e.preventDefault();
    //avoid submitting an empty string
    if (todo !== "") {
      setTodos([
        ...todos,
      {
        id: todos.length + 1,
        text: todo.trim(),
      }]);
    }
    setTodo('');
    }
    const handleEditFormSubmit = (e) => {
      e.preventDefault();
      handleUpdateTodo(currentTodo.id, currentTodo);
    }
    
    //function to delete a todo
    const handleDelete = (id) => {
      const removeItem = todos.filter((todo) => 
      //つまりこれは、todo.idとidが一致しないものだけを残すということ。 
      //idと一致するものは、filterで除外される。
        {return todo.id !== id}
        );
        setTodos(removeItem);
    }

    const handleUpdateTodo = (id, updatedTodo) => {
      const updatedItem = todos.map((todo) => {
          return todo.id === id ? updatedTodo : todo;
      });
      setIsEditing(false);
      setTodos(updatedItem);
    }

    const handleEditClick = (todo) => {
      setIsEditing(true);
      setCurrentTodo({...todo});
    }

  return (
    <div className='App'>
    {isEditing ? (
      <EditForm
      currentTodo={currentTodo}
      setIsEditing={setIsEditing}
      onEditInputChange={handleEditInputChange}
      onEditFormSubmit={handleEditFormSubmit}
      />
      
    ):(
      <AddTodoForm
      todo={todo}
      onAddInputChange={handleInputChange}
      onAddFormSubmit={handleFormSubmit}
      />
    )
    }
        {/* create a ul to hold all of the list items */}
      <ul className='todo-list'>
        {/* map over the todos array and create a li for each todo */}
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onEditClick={handleEditClick}
            onDelete={handleDelete}/>
        ))}
      </ul>

    </div>
  );
}

export default App;
