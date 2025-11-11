import React, { useState, useEffect } from 'react';

const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeZones = [
    { city: 'New York', timezone: 'America/New_York' },
    { city: 'London', timezone: 'Europe/London' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo' },
    { city: 'Sydney', timezone: 'Australia/Sydney' },
    { city: 'Dubai', timezone: 'Asia/Dubai' },
    { city: 'Paris', timezone: 'Europe/Paris' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata' },
    { city: 'Shanghai', timezone: 'Asia/Shanghai' }
  ];

  const getTimeForTimezone = (timezone) => {
    return time.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getDateForTimezone = (timezone) => {
    return time.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="world-clocks">
      {timeZones.map(({ city, timezone }) => (
        <div key={city} className="clock-card">
          <div className="clock-city">{city}</div>
          <div className="clock-time">{getTimeForTimezone(timezone)}</div>
          <div className="clock-date">{getDateForTimezone(timezone)}</div>
        </div>
      ))}
    </div>
  );
};

export default WorldClock;