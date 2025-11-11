export const playAlarmSound = () => {
  // Try to use Web Audio API, fallback to browser audio
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    oscillator.start();
    
    setTimeout(() => {
      oscillator.stop();
    }, 1000);
  } catch (error) {
    // Fallback: Use browser beep
    console.log('Alarm!');
  }
};