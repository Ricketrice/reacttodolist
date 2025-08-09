import { TodoListItem } from "./TodoListItem"


export function TodoList({todo, toggleTodo, deleteTodo}) {
    return (
        <ul className="list">
        {todo.length == 0 && "No todos"}
        {todo.map(todo => {
          return ( 
        <TodoListItem {...todo} key={todo.id}
        toggleTodo={toggleTodo} deleteTodo={deleteTodo}
        />

          )
        })}
      </ul>
    )
    
}

