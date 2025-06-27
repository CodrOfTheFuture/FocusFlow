import {useState, useEffect} from "react"
import ToDoInput from "./ToDoInput"
import ToDoList from "./ToDoList"

const ToDoApp = () => {
2

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

export default ToDoApp