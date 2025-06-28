import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Calendar.css'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState({})
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState('')

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events')
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents))
      } catch (error) {
        console.error('Error loading calendar events:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events))
  }, [events])

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const getDateKey = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString()
  }

  const addEvent = () => {
    if (newEvent.trim() && selectedDate) {
      const dateKey = getDateKey(selectedDate)
      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent.trim()]
      }))
      setNewEvent('')
      setShowEventForm(false)
    }
  }

  const deleteEvent = (eventIndex) => {
    if (selectedDate) {
      const dateKey = getDateKey(selectedDate)
      setEvents(prev => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((_, index) => index !== eventIndex) || []
      }))
    }
  }

  const isToday = (day) => {
    const today = new Date()
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return checkDate.toDateString() === today.toDateString()
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = getDateKey(day)
      const hasEvents = events[dateKey] && events[dateKey].length > 0
      const isSelected = selectedDate === day
      const todayClass = isToday(day) ? 'today' : ''

      days.push(
        <div
          key={day}
          className={`calendar-day ${todayClass} ${isSelected ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => {
            setSelectedDate(day)
            setShowEventForm(true)
          }}
        >
          <span className="day-number">{day}</span>
          {hasEvents && <div className="event-indicator"></div>}
        </div>
      )
    }

    return days
  }

  return (
    <>
      <Link to="/" className="back-btn">← Back to Home</Link>
      <div className="calendar-container">
        <div className="calendar-header">
          <h1 className="calendar-title">📅 Calendar</h1>
          
          <div className="calendar-nav">
            <button onClick={() => navigateMonth(-1)} className="nav-btn">‹</button>
            <h2 className="month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={() => navigateMonth(1)} className="nav-btn">›</button>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-days-header">
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </div>

        {selectedDate && (
          <div className="event-section">
            <h3 className="event-title">
              Events for {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
            </h3>
            
            <div className="events-list">
              {events[getDateKey(selectedDate)]?.map((event, index) => (
                <div key={index} className="event-item">
                  <span className="event-text">{event}</span>
                  <button 
                    onClick={() => deleteEvent(index)} 
                    className="delete-event-btn"
                    title="Delete event"
                  >
                    ×
                  </button>
                </div>
              )) || <p className="no-events">No events scheduled</p>}
            </div>

            {showEventForm && (
              <div className="add-event-form">
                <input
                  type="text"
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  placeholder="Add new event..."
                  className="event-input"
                  onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                />
                <div className="event-form-buttons">
                  <button onClick={addEvent} className="add-event-btn">Add Event</button>
                  <button 
                    onClick={() => {
                      setShowEventForm(false)
                      setNewEvent('')
                    }} 
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Calendar
