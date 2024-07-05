import React, { useState } from 'react';
import './inputform.css';
import ChooseFile from '../images/attach.png';

const InputForm = ({ onAddPath, selectedDrone }) => {
  const [latLngList, setLatLngList] = useState('');
  const [interval, setInterval] = useState(1000);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setLatLngList(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleAddPath = () => {
    const path = latLngList.split('\n').map(line => {
      const [latStr, lngStr] = line.split(',');
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinates:', latStr, lngStr);
        return null; 
      }
      return { lat, lng, interval };
    }).filter(coord => coord !== null);
    onAddPath(path, interval);
    setLatLngList(''); 
  };

  const handleImageClick = () => {
    document.getElementById('hidden-file-input').click();
  };

  return (
    <div className="input-fields">
      <textarea
        value={latLngList}
        onChange={(e) => setLatLngList(e.target.value)}
        placeholder="Enter lat,lng per line"
        rows="10"
        cols="30"
      />
      <p>or</p>
      <div className="file-upload-wrapper" onClick={handleImageClick}>
        <img src={ChooseFile} alt="Choose file" className="file-upload-image" />
        <p>Choose txt file</p>
      </div>
      <input
        type="file"
        id="hidden-file-input"
        className="hidden-file-input"
        accept=".txt"
        onChange={handleFileUpload}
      />
      <p className='interval-label'>Enter interval time</p>
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        placeholder="Interval in ms"
        className="interval-input"
      />
      <button onClick={handleAddPath}>Simulate</button>
    </div>
  );
};

export default InputForm;
