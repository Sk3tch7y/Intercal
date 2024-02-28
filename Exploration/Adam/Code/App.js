import { useState } from 'react';
import './App.css';
import NewTodo from './NewTodo';
import TodoList from './TodoList';

export default function App() {
  const[todos, setTodos] = useState([]);

  function addNewTodo(newItem, a){
      setTodos(newItems =>{
        console.log(newItem, a, false);
        let newAr = [...todos, {name: newItem, id: a, checked: false},];
        return newAr;
    });
  }
  function handleDelete(e){
    setTodos(todo => {
      return todos.filter(todo => todo.id !== e);
    });
    
  }

  function handleCheck(e){
    setTodos(cur => {
      return cur.map(todo => {
        if(todo.id === e){
          return {...todo, checked: !todo.checked,};
        }
        return todo;
      });
    });
  }
  console.log(todos);

  
  return (
    <>
    <NewTodo addNewTodo={addNewTodo}/>
    <h1>Todo List</h1>
    <TodoList todos={todos} handleDelete={handleDelete} handleCheck={handleCheck}/>
    </>
  );
}