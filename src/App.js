import './App.css';
import React, {useState} from 'react';

function App() {

  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoCounter, setTodoCounter] = useState(0)
  //const [editedTodo, setEditedTodo] = useState("")

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().length > 0) {
      setValue("")
      setTodoCounter(todoCounter + 1)
      setTodos(todos => [...todos, {id: todoCounter, text: value}])
      
    }   
  }


  function handleDoneClick(id) {
    // console.log(id) // debug
    const notCompleteTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(notCompleteTodos);
  }
  
  function handleEditClick(text, id) {
    const editedTodo = window.prompt("Edit this task:", text)
    if (editedTodo != null && editedTodo.trim().length > 0) {
      const notEditedTodos = todos.filter((todo) => {
        return todo.id !== id
      })
      setTodos(notEditedTodos);
      setTodos(todos => [...todos, {id: id, text: editedTodo}])
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
            {todos.sort((a, b) => a.id - b.id).reverse().map((todo) => 
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
