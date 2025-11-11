import React, { useState, useEffect } from 'react';
import { playAlarmSound } from '../utils/audio';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1000) {
            setIsRunning(false);
            setIsCompleted(true);
            playAlarmSound();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (inputTime > 0) {
      setTime(inputTime * 1000);
      setIsRunning(true);
      setIsCompleted(false);
    }
  };

  const pauseResume = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setInputTime(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const setQuickTime = (minutes) => {
    setInputTime(minutes * 60);
    setTime(minutes * 60 * 1000);
  };

  return (
    <div className="timer-container">
      <div className="time-large" style={{ color: isCompleted ? '#4CAF50' : 'white' }}>
        {formatTime(time)}
      </div>

      {isCompleted && (
        <div style={{ color: '#4CAF50', fontSize: '1.5rem', marginBottom: '20px' }}>
          Timer Completed!
        </div>
      )}

      <div className="controls" style={{ marginBottom: '30px' }}>
        <button className="btn" onClick={() => setQuickTime(1)}>1 Min</button>
        <button className="btn" onClick={() => setQuickTime(5)}>5 Min</button>
        <button className="btn" onClick={() => setQuickTime(10)}>10 Min</button>
        <button className="btn" onClick={() => setQuickTime(15)}>15 Min</button>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
        <input
          type="number"
          placeholder="Seconds"
          value={inputTime}
          onChange={(e) => setInputTime(parseInt(e.target.value) || 0)}
          style={{ padding: '10px', borderRadius: '8px', border: 'none', fontSize: '1rem' }}
        />
        <button className="btn primary" onClick={startTimer}>
          Set Timer
        </button>
      </div>

      <div className="controls">
        <button 
          className="btn primary" 
          onClick={pauseResume}
          disabled={time === 0}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button className="btn danger" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;