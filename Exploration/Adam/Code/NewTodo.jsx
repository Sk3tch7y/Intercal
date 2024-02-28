import { useState } from 'react';

export default function NewTodo({addNewTodo}){
    const [newItem, setNewItem] = useState("");
    
    function handleSubmit(e){
            e.preventDefault();
            addNewTodo(newItem, crypto.randomUUID());
            setNewItem("");
        }
    
    return(
        <form onSubmit={handleSubmit} className='add'>
          <label htmlFor='new'>New Item</label>
          <input 
            type = 'text' id = 'new'
            value = {newItem}
            onChange = {e => setNewItem(e.target.value)}
          ></input>
          <br></br>
          <button className = 'add'>Add</button>
          <input type = 'reset'/>
        </form>
      );  
}
