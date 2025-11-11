import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="stopwatch-container">
      <div className="time-large">
        {formatTime(time)}
      </div>
      
      <div className="controls">
        <button className="btn primary" onClick={startStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
        <button className="btn" onClick={addLap} disabled={!isRunning}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-list">
          <h3 style={{ color: 'white', marginBottom: '15px' }}>Laps</h3>
          {laps.map((lap, index) => (
            <div key={index} className="lap-item">
              Lap {index + 1}: {formatTime(lap)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;