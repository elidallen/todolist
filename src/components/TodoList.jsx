// Importing necessary dependencies from React
import React, { useReducer, useState } from 'react';

// Importing the initial state for the todo list
import { initialState } from '../data/initialState';

// Importing the styles for the TodoList component
import './TodoList.css';

// Reducer function to handle state changes for the todo list
const todoReducer = (state, action) => {
  switch (action.type) {
    // Case for adding a new todo
    case 'ADD_TODO':
      // Adding a new todo to the state array with the given text and completion status
      return [action.payload, ...state];

    // Case for toggling the completion status of a todo
    case 'TOGGLE_TODO':
      // Mapping over the todos and toggling the completion status of the selected todo
      return state.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );

    // Case for deleting a todo
    case 'DELETE_TODO':
      // Filtering out the todo with the specified index
      return state.filter((_, index) => index !== action.payload);

    // Case for editing the text of a todo
    case 'EDIT_TODO':
      // Mapping over the todos and updating the text of the selected todo
      return state.map((todo, index) =>
        index === action.payload.index ? { ...todo, title: action.payload.title } : todo
      );

    // Default case for unchanged state
    default:
      return state;
  }
};

// Functional component for the TodoList
const TodoList = () => {
  // Initializing state using the useReducer hook with the defined reducer and initial state
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  
  // Initializing state for the new todo input
  const [newTodo, setNewTodo] = useState('');

  // Function to add a new todo to the list
  const addTodo = () => {
    // Trimming the input and checking if it's not empty
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo) {
      // Dispatching an action to add a new todo and clearing the input
      dispatch({ type: 'ADD_TODO', payload: { title: trimmedTodo, completed: false } });
      setNewTodo('');
    }
  };

  // JSX for rendering the TodoList component
  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <div className="add-todo">
        {/* Input for adding a new todo */}
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {/* Button to trigger the addTodo function */}
        <button onClick={addTodo}>Add</button>
      </div>
      {/* Displaying the list of todos */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {/* Checkbox for marking a todo as complete */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: index })}
            />
            {/* Displaying the todo text with completed styling if it's marked as complete */}
            {todo.completed ? (
              <span className="completed">{todo.title}</span>
            ) : (
              <span>{todo.title}</span>
            )}
            {/* Buttons for deleting and editing todos */}
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: index })}>
              Delete
            </button>
            <button
              onClick={() => {
                // Prompting the user to edit the todo text
                const newTitle = prompt('Edit todo:', todo.title);
                if (newTitle !== null) {
                  // Dispatching an action to edit the todo text
                  dispatch({ type: 'EDIT_TODO', payload: { index, title: newTitle } });
                }
              }}
              disabled={todo.completed}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporting the TodoList component as the default export
export default TodoList;