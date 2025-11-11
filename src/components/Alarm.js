import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { playAlarmSound } from '../utils/audio';

const Alarm = () => {
  const [alarms, setAlarms] = useLocalStorage('alarms', []);
  const [newAlarm, setNewAlarm] = useState({ time: '', label: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check alarms
      alarms.forEach(alarm => {
        if (alarm.active) {
          const alarmTime = new Date();
          const [hours, minutes] = alarm.time.split(':');
          alarmTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          if (now.getHours() === alarmTime.getHours() && 
              now.getMinutes() === alarmTime.getMinutes() &&
              now.getSeconds() === 0) {
            playAlarmSound();
            alert(`Alarm: ${alarm.label || alarm.time}`);
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms]);

  const addAlarm = () => {
    if (newAlarm.time) {
      setAlarms([...alarms, { ...newAlarm, active: true, id: Date.now() }]);
      setNewAlarm({ time: '', label: '' });
    }
  };

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ));
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="alarm-container">
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        Set Alarms
      </h2>
      
      <div className="alarm-form">
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={newAlarm.time}
            onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label>Label (Optional)</label>
          <input
            type="text"
            placeholder="Wake up, Medicine, etc."
            value={newAlarm.label}
            onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
          />
        </div>
        
        <button className="btn primary" onClick={addAlarm}>
          Add Alarm
        </button>
      </div>

      <div className="alarms-list">
        {alarms.map(alarm => (
          <div key={alarm.id} className="alarm-item">
            <div>
              <div className="alarm-time">{alarm.time}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                {alarm.label || 'Alarm'}
              </div>
            </div>
            <div className="alarm-actions">
              <button 
                className={`btn ${alarm.active ? 'danger' : 'primary'}`}
                onClick={() => toggleAlarm(alarm.id)}
              >
                {alarm.active ? 'Disable' : 'Enable'}
              </button>
              <button 
                className="btn danger"
                onClick={() => deleteAlarm(alarm.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {alarms.length === 0 && (
          <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
            No alarms set
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarm;