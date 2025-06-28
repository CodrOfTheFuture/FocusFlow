import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Countdown.css'


const Countdown = () => {
    const [secondsLeft, setSecondsLeft] = useState(() => {
        const saved = localStorage.getItem('pomodoro-end-time')
        if (saved) {
            const remaining = Math.max(0, Math.floor((parseInt(saved) - Date.now()) / 1000))
            return remaining > 0 ? remaining : 1500
        }
        return 1500
    });
    const [isRunning, setIsRunning] = useState(() => {
        const saved = localStorage.getItem('pomodoro-end-time')
        return saved && parseInt(saved) > Date.now()
    });
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    useEffect(() => {
        if (!isRunning) return;

        if (secondsLeft === 0) {
            setIsRunning(false);
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        }, [isRunning, secondsLeft]);
        
    return (
        <>
            <Link to="/" className="back-btn-pomodoro">← Back to Home</Link>
            <div className="countdown-container">
                <h2 className="timer-title">Pomodoro Timer</h2>
                <div className="timer-display">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
                
                <div className="timer-controls">
                    <button 
                        className="timer-btn start-btn"
                        onClick={() => {
                            setIsRunning(true)
                            localStorage.setItem('pomodoro-end-time', (Date.now() + secondsLeft * 1000).toString())
                        }}
                        disabled={isRunning}
                    >
                        Start
                    </button>

                    <button 
                        className="timer-btn pause-btn"
                        onClick={() => {
                            setIsRunning(false)
                            localStorage.removeItem('pomodoro-end-time')
                        }}
                        disabled={!isRunning}
                    >
                        Pause
                    </button>

                    <button 
                        className="timer-btn reset-btn"
                        onClick={() => {
                            setIsRunning(false);
                            setSecondsLeft(1500);
                            localStorage.removeItem('pomodoro-end-time');
                        }}
                    >
                        Reset
                    </button>
                </div>
                

            </div>
        </>
    )
}

export default Countdown