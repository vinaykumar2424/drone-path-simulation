import React, { useEffect, useState } from 'react';
import './dronecontrol.css';

const DroneControl = ({ drones, handlePauseResume, selectedDrone, setSelectedDrone }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (droneId) => {
    setSelectedDrone(droneId);
    setIsDropdownOpen(false);
  };

  const handlePauseResumeClick = (event, droneId) => {
    event.stopPropagation();
    handlePauseResume(droneId);
  };

  return (
    <div className="drone-dropdown">
      <div
        className="selected-drone"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedDrone ? `Drone ${selectedDrone}` : 'Select Drone'}
      </div>
      {isDropdownOpen && (
        <div className="drone-ids">
          {drones.length > 0 ? (
            drones.map((drone) => (
              <div key={drone.id} className="drone-item" onClick={() => handleSelect(drone.id)}>
                <span className="drone-id">
                  Drone {drone.id}
                </span>
                <button onClick={(event) => handlePauseResumeClick(event, drone.id)}>
                  {drone.isPaused ? 'Resume' : 'Pause'}
                </button>
              </div>
            ))
          ) : (
            <div className="drone-item">
              <span className="drone-id">
                No drones found
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DroneControl;




