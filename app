import { useEffect, useState } from “react”;
import axios from “axios”;
import “/src/App.scss”;
function Todo() {
  const [todos, setTodos] = useState({});
  useEffect(() => {
    axios(“https://jsonplaceholder.typicode.com/todos”).then(response => {
      setTodos(response.data);
    });
  }, []);
  return (
    <div className=“main__container”>
      <div className=“main__container__header”>
        <div className=“main__container__title”>
          <h1>ToDo</h1>
        </div>
      </div>
      <div className=“main__container__todo--section”>
        <div className=“todo__container”>
          <ul className=“todo__items”>
            {Object.values(todos).map(todo => (
              <li key={todo.id} className=“todo__item”>
                {todo.title}
                <div className=“todo__item__btn__box”>
                  <button className=“todo__edit btn”>Edit</button>
                  <button className=“todo__dlt btn”>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Todo;







