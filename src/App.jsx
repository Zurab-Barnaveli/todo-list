// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";


const deleteBtn = {
  color: "red",
  fontSize: "16px",
  cursor: "pointer",
  marginLeft: "10px",
  marginRight:"10px"
};

function todo() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({
    title: "",
    completed: false,
    isBeingEdited: false,
  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50').then(res => {
      setTodos(res.data)
    })
  }, [])


  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleCompletedTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEditMode = (index) => {
    setEditTodo({ ...todos[index] });
    const newTodos = [...todos];
    newTodos[index].isBeingEdited = true;
    setTodos(newTodos);
  };

  const handleEditTodo = (title) => {
    setEditTodo({ ...editTodo, title });
  };

  const handleDone = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, editTodo);
    setTodos(newTodos);
    alert('edit confirmed')
  };

  return (
    <div className="todo">
      <h1 class="todo_header">TO-DO</h1>
      <ul class="todo_list">
        {todos.map((todo, index) => {
          return todo.isBeingEdited ? (
            <>
              <div class="edit">
                <input
                  class="edit_input"
                  type="text"
                  value={editTodo.title}
                  onChange={(e) => handleEditTodo(e.target.value)}
                />
                <button class="edit_confirm" onClick={() => handleDone(index)}>✓</button>
              </div>
            </>
          ) : (
            <li class="todo_list-item">
              <span
                onClick={() => handleCompletedTodo(index)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "",
                }}
              >
                {todo.title}
              </span>
              <div class="buttons">
                <span class="buttons_delete" style={deleteBtn} onClick={() => handleDelete(index)}>
                  ✖
                </span>
                <span class="buttons_edit" onClick={() => handleEditMode(index)}>Edit</span>
              </div>
            </li> 
          );
        })}
      </ul>
    </div>
  );
}

export default todo;
