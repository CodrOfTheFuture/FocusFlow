import {useState, useEffect} from 'react'
import './Countdown.css'


const Countdown = () => {
    const [secondsLeft, setSecondsLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
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
        <div className="countdown-container">
            <h2 className="timer-title">Pomodoro Timer</h2>
            <div className="timer-display">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            
            <div className="timer-controls">
                <button 
                    className="timer-btn start-btn"
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning}
                >
                    Start
                </button>

                <button 
                    className="timer-btn pause-btn"
                    onClick={() => setIsRunning(false)}
                    disabled={!isRunning}
                >
                    Pause
                </button>

                <button 
                    className="timer-btn reset-btn"
                    onClick={() => {
                        setIsRunning(false);
                        setSecondsLeft(1500);
                    }}
                >
                    Reset
                </button>
            </div>
            

        </div>
    )
}

export default Countdown