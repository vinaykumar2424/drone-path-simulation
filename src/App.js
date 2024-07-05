import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import InputForm from './components/InputForm';
import DroneControl from './components/DroneControl';
import SeekBar from './components/SeekBar';

const App = () => {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [newDroneId, setNewDroneId] = useState('');

  const handleAddPath = (path, interval) => {
    if (selectedDrone) {
      setDrones((prevDrones) => {
        const updatedDrones = [...prevDrones];
        const existingDroneIndex = updatedDrones.findIndex((drone) => drone.id === selectedDrone);

        if (existingDroneIndex !== -1) {
          updatedDrones[existingDroneIndex].path = [...updatedDrones[existingDroneIndex].path, ...path];
          if (!updatedDrones[existingDroneIndex].isPaused) {
            updatedDrones[existingDroneIndex].currentPosition = path[0]; // update currentPosition to the first position in the new path
          }
        } else {
          updatedDrones.push({ id: selectedDrone, path, currentPosition: path[0], interval, currentIndex: 0, isPaused: false, intervalId: null });
        }
        return updatedDrones;
      });
    }
  };

  const handleAddDrone = () => {
    if (newDroneId && !drones.find((drone) => drone.id === newDroneId)) {
      setDrones([...drones, { id: newDroneId, path: [], currentPosition: null, interval: 1000, currentIndex: 0, isPaused: false, intervalId: null }]);
      setSelectedDrone(newDroneId);
      setNewDroneId('');
    }
  };

  useEffect(() => {
    drones.forEach((drone) => {
      if (drone.path.length > 0 && !drone.isPaused && !drone.intervalId) {
        const id = setInterval(() => {
          setDrones((prevDrones) => {
            const updatedDrones = [...prevDrones];
            const droneIndex = updatedDrones.findIndex((d) => d.id === drone.id);
            if (droneIndex !== -1) {
              const currentIndex = updatedDrones[droneIndex].currentIndex;
              if (currentIndex >= updatedDrones[droneIndex].path.length - 1) {
                clearInterval(updatedDrones[droneIndex].intervalId);
                updatedDrones[droneIndex].intervalId = null;
              } else {
                updatedDrones[droneIndex].currentPosition = updatedDrones[droneIndex].path[currentIndex + 1];
                updatedDrones[droneIndex].currentIndex = currentIndex + 1;
              }
            }
            return updatedDrones;
          });
        }, drone.interval);

        setDrones((prevDrones) => {
          const updatedDrones = [...prevDrones];
          const droneIndex = updatedDrones.findIndex((d) => d.id === drone.id);
          if (droneIndex !== -1) {
            updatedDrones[droneIndex].intervalId = id;
          }
          return updatedDrones;
        });
      } else if (drone.isPaused && drone.intervalId) {
        clearInterval(drone.intervalId);
        setDrones((prevDrones) => {
          const updatedDrones = [...prevDrones];
          const droneIndex = updatedDrones.findIndex((d) => d.id === drone.id);
          if (droneIndex !== -1) {
            updatedDrones[droneIndex].intervalId = null;
          }
          return updatedDrones;
        });
      }
    });
  }, [drones]);

  const handlePauseResume = (droneId) => {
    setDrones((prevDrones) => {
      return prevDrones.map((drone) => {
        if (drone.id === droneId) {
          const isPaused = !drone.isPaused;
          if (isPaused && drone.intervalId) {
            clearInterval(drone.intervalId);
          }
          return {
            ...drone,
            isPaused: isPaused,
            intervalId: isPaused ? null : drone.intervalId,
          };
        }
        return drone;
      });
    });
  };

  const handleSeekBarChange = (droneId, percentage) => {
    setDrones((prevDrones) => {
      return prevDrones.map((drone) => {
        if (drone.id === droneId) {
          const totalPoints = drone.path.length;
          const newIndex = Math.floor((percentage / 100) * totalPoints);
          return {
            ...drone,
            currentIndex: newIndex,
            currentPosition: drone.path[newIndex],
          };
        }
        return drone;
      });
    });
  };

  return (
    <div className="App">
      <section className='map-section'>
        <div className="top-bar">
          <DroneControl drones={drones} handlePauseResume={handlePauseResume} selectedDrone={selectedDrone} setSelectedDrone={setSelectedDrone} />
          <div className='drone-id-input-bar'>
            <input
              type="text"
              value={newDroneId}
              onChange={(e) => setNewDroneId(e.target.value)}
              placeholder="Drone ID"
              className="drone-id-input"
            />
            <button onClick={handleAddDrone} className="add-drone-button">
              Add Drone
            </button>
          </div>
        </div>
        <MapComponent drones={drones} />
      </section>
      <section className="input-section">
        <InputForm onAddPath={handleAddPath} selectedDrone={selectedDrone} />
        {selectedDrone && (
          <SeekBar 
            drone={drones.find(drone => drone.id === selectedDrone)} 
            onSeekBarChange={handleSeekBarChange} 
          />
        )}
      </section>
    </div>
  );
};

export default App;
