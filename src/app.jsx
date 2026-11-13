import React, { useState, useEffect } from "react";

export default function App() {
    const WORK_TIME = 25 * 60;
    const BREAK_TIME = 5 * 60;

    const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work');

    useEffect(() => {
        let interval = null;
        if(isActive && secondsLeft !== 0){
            interval = setInterval(() => {
                setSecondsLeft((prev) => prev -1);
            }, 1000);
        }
        else if(secondsLeft === 0){
            const nextMode = mode === 'work'? 'break' : 'work';
            setMode(nextMode);
            setSecondsLeft(nextMode === 'work'? WORK_TIME : BREAK_TIME);
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [secondsLeft, isActive, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    }

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(mode === 'work'? WORK_TIME : BREAK_TIME);
    }

    const switchMode= (newMode) => {
        setIsActive(false);
        setMode(newMode);
        setSecondsLeft(newMode === 'work'? WORK_TIME : BREAK_TIME);
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs/60);
        const seconds = secs % 60;
        return (`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }
    return(
        <div id="container">
      <h1>Pomodoro Timer</h1>
      <div id="display">
      <h2 id="timerDisplay">{formatTime(secondsLeft)}</h2>
      <h2 id="sessionDisplay">{mode === 'work' ? 'Focus session' : 'Short Break'}</h2>
      </div>
      <div id="mode-btns">
      <button className="mode" onClick={() => switchMode('work')}>Work</button>
      <button className="mode" onClick={() => switchMode('break')}>Break</button>
      </div>
      <div id="btn">
      <button id="toggle-btn" onClick={toggleTimer}>{isActive ? 'Pause': 'Start'}</button>
      <button id="reset-btn" onClick={resetTimer}>Reset</button>
      </div>
    </div>
    )
}