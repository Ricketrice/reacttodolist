

export function TodoListItem({id, completed, toggleTodo, deleteTodo, title}) {
    return (
          <li>
            <label>
              <input type="checkbox" checked={completed}
              onChange={e=> toggleTodo(id, e.target.checked)}
               /> {title} 
               
            </label>
            
            <button 
            onClick={() => deleteTodo(id)}
            className="btn btn-danger"
            >Delete</button>
          </li>
    )
}


