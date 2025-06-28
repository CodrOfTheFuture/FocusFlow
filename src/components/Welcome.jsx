import React from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <h1 className="welcome-title">✨ FocusFlow</h1>
        <p className="welcome-subtitle">
          Your all-in-one solution for staying organized and focused
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Todo Manager</h3>
            <p>Keep track of your tasks with our intuitive todo list. Add, edit, and delete tasks with ease.</p>
            <Link to="/todo" className="feature-btn">Get Started</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🍅</div>
            <h3>Pomodoro Timer</h3>
            <p>Boost your productivity with the proven Pomodoro Technique. Focus for 25 minutes, then take a break.</p>
            <Link to="/pomodoro" className="feature-btn">Start Timer</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Calendar</h3>
            <p>Plan and organize your schedule with our interactive calendar. Add events and stay on top of important dates.</p>
            <Link to="/calendar" className="feature-btn">View Calendar</Link>
          </div>
        </div>
        
        <div className="welcome-stats">
          <div className="stat">
            <span className="stat-number">25</span>
            <span className="stat-label">Minutes Focus</span>
          </div>
          <div className="stat">
            <span className="stat-number">∞</span>
            <span className="stat-label">Tasks Managed</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Productivity</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome