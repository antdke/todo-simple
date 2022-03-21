import db from './firebase-config.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"


import './App.css';
import React, {useState, useEffect} from 'react';


function App() {

  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const todosCollectionRef = collection(db, "todos")


  useEffect(() => {
    
    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getTodos()
  },[]);

  function handleChange(e) {
    setValue(e.target.value)
  }

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      setValue("")
      await addDoc(todosCollectionRef, {text: value, created: new Date()})
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }   
  }

  // DELETE
  const handleDoneClick = async (id) => {
    const todoDoc = doc(db, "todos", id)
    await deleteDoc(todoDoc)
    const data = await getDocs(todosCollectionRef);
    setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }
  
  // EDIT
  const handleEditClick = async (text, id) => {
    const editedTodo = window.prompt("Edit this task:", text)
    if (editedTodo != null && editedTodo.trim().length > 0) {
      const todoDoc = doc(db, "todos", id)
      await updateDoc(todoDoc, {text: editedTodo})
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>My Todo List</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Enter Todo:
                <input type="text" name="name" value={value} onChange={handleChange}/>
              </label>
              <input type="submit" value="Submit" />
          </form>
          </div>
          <div>
          <ul>
            {todos.sort((a, b) => a.created - b.created).reverse().map((todo) => 
              <li key={todo.id}>
                {todo.text} {" "}
                <button key={todo.id} onClick={() => handleDoneClick(todo.id)}>Done!</button>
                {" "}
                <button onClick={() => handleEditClick(todo.text, todo.id)}>Edit</button>
              </li>
            )}
          </ul>
            
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
