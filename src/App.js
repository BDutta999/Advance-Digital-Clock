import React, { useState } from 'react';
import Clock from './components/Clock';
import Alarm from './components/Alarm';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import WorldClock from './components/WorldClock';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('clock');

  const tabs = [
    { id: 'clock', name: 'Digital Clock' },
    { id: 'world', name: 'World Clock' },
    { id: 'alarm', name: 'Alarm' },
    { id: 'stopwatch', name: 'Stopwatch' },
    { id: 'timer', name: 'Timer' }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Advanced Digital Clock</h1>
        <nav className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'clock' && <Clock />}
        {activeTab === 'world' && <WorldClock />}
        {activeTab === 'alarm' && <Alarm />}
        {activeTab === 'stopwatch' && <Stopwatch />}
        {activeTab === 'timer' && <Timer />}
      </main>
    </div>
  );
}

export default App;