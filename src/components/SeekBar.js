import React from 'react';
import './seekbar.css'; 

const SeekBar = ({ drone, onSeekBarChange }) => {
  const handleChange = (event) => {
    const percentage = parseInt(event.target.value, 10);
    onSeekBarChange(drone.id, percentage);
  };

  return (
    <div className="seekbar-container">
      <input
        type="range"
        min="0"
        max="100"
        value={(drone.currentIndex / drone.path.length) * 100}
        onChange={handleChange}
        className="seekbar"
      />
    </div>
  );
};

export default SeekBar;
