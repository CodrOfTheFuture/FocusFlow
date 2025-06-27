import {useState, useEffect} from "react"
import ToDoCard from "./components/ToDoCard"
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"

const App = () => {


  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddToDos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteToDo(index){
    const newTodoList = todos.filter((todo,todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  function handleEditToDo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteToDo(index)
  }
  useEffect(() => {
      if (!localStorage) {
        return
      }

      let localTodos = localStorage.getItem('todos')
      if (!localTodos) {
        return
      }

      console.log(localTodos)
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos)

    }, [])
  
  return (
    
    <>
      <ToDoInput handleAddToDos={handleAddToDos} todoValue={todoValue} setTodoValue={setTodoValue} />
      <ToDoList handleEditToDo={handleEditToDo} handleDeleteToDo={handleDeleteToDo} todos={todos}/>
    </>
  )
}

export default App