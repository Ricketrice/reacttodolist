import { useState } from "react"


export function NewTodoForm({onSubmit}) {
    const [newItem, setNewItem] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault();
        if (newItem === "") return 

        onSubmit(newItem)
        setNewItem("")
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New item</label>
          <input type="text" id="item" value={newItem} onChange={event => setNewItem(event.target.value)}/>
        </div>
        <button className="btn">Add me</button>

      </form>
    )
}