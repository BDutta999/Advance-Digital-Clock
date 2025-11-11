import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    if (is24Hour) {
      return date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } else {
      return date.toLocaleTimeString('en-US', { 
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="clock-container">
      <div className="time-display">
        {formatTime(time)}
      </div>
      <div className="date-display">
        {formatDate(time)}
      </div>
      <div className="clock-controls">
        <button 
          className="btn"
          onClick={() => setIs24Hour(!is24Hour)}
        >
          Switch to {is24Hour ? '12-hour' : '24-hour'} format
        </button>
      </div>
    </div>
  );
};

export default Clock;