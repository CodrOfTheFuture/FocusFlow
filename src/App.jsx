import { Routes, Route, Link } from 'react-router-dom'
import ToDoApp from './components/ToDo/ToDoApp'
import PomodoroApp from './components/pomodoro/PomodoroApp'

const App = () => {
  return (
    <>
      <nav>
        <Link to="/todo">Todo</Link>
        <Link to="/pomodoro">Pomodoro</Link>
      </nav>
      
      <Routes>
        <Route path="/todo" element={<ToDoApp />} />
        <Route path="/pomodoro" element={<PomodoroApp/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
