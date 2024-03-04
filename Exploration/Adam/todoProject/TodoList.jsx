export default function TodoList({todos, handleDelete, handleCheck}){

    return(

        <ul>
            {todos.map(todo =>{
            return(
            <li key={todo.id}>
                <label>
                <input type='checkbox' value={todo.checked} onChange={e => handleCheck(todo.id)}></input>
                {todo.name}
                </label>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
            );
            })}

        </ul>
    );
}
