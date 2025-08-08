import { useState } from "react"
import { NewTodoForm } from "./NewTodoForm"

export default function App() {
  const [todo, setTodo] = useState([])

  function addTodo(title) {
      setTodo(currentItem => {
        return [
        ...currentItem, {id: crypto.randomUUID(), title: title, completed:false},
        ]
        })
  }

  function toggleTodo(id, completed) {
      setTodo(currentTodo => {
        return currentTodo.map(todo=> {
          if (todo.id == id) {
            return {...todo, completed}
          }
          return todo
        })
      })
  }

  function deleteTodo(id) {
    setTodo(currentTodo => {
      return currentTodo.filter(todo => todo.id !== id);
    })
  }

  return (
    <> 
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todo.length == 0 && "No todos"}
        {todo.map(todo => {
          return ( 
          <li key = {todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed}
              onChange={e=> toggleTodo(todo.id, e.target.checked)} /> {todo.title} 
            </label>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
          </li>
          )
        })}
      </ul>
    </>

  )
}
