import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import droneIcon from '../images/drone.png';

const containerStyle = {
  width: '90%',
  height: '80vh',
  marginLeft:'5%'
};

const MapComponent = ({ drones }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (drones.length > 0) {
      const lastDrone = drones[drones.length - 1];
      if (lastDrone.currentPosition) {
        setCenter(lastDrone.currentPosition);
      }
    }
  }, [drones]);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        {drones.map(drone => (
          <React.Fragment key={drone.id}>
            {drone.path.length > 0 && (
              <Polyline
                path={drone.path}
                options={{ strokeColor: '#FF0000' }}
              />
            )}
            {drone.currentPosition && (
              <Marker
                position={drone.currentPosition}
                icon={{
                  url: droneIcon,
                  scaledSize: new window.google.maps.Size(25, 25),
                  anchor: new window.google.maps.Point(12.5, 12.5)
                }}
              />
            )}
          </React.Fragment>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
