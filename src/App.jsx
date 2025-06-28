import { Routes, Route, Link } from 'react-router-dom'
import ToDoApp from './components/ToDo/ToDoApp'
import PomodoroApp from './components/pomodoro/PomodoroApp'
import Calendar from './components/calendar/Calendar'
import Welcome from './components/Welcome'

const App = () => {
  return (
    <>
      
      <Routes>
        <Route path="/todo" element={<ToDoApp />} />
        <Route path="/pomodoro" element={<PomodoroApp/>}></Route>
        <Route path="/calendar" element={<Calendar/>}></Route>
        <Route path="/" element={<Welcome/>}></Route>
      </Routes>
    </>
  )
}

export default App
