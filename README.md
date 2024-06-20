# Drone Path Simulation

## Introduction
Drone Path Simulation is a web application that allows users to simulate the movement of drones on a map based on specified latitude and longitude coordinates. Users can add multiple drones, provide paths through text input or file upload, control the simulation, and even jump to specific points in the simulation using a seek bar.

## Features
- **Add Multiple Drones**: Add and manage multiple drones with unique IDs.
- **Input Coordinates**: Enter coordinates manually or upload a text file with coordinates.
- **Simulate Paths**: Simulate the drone's movement along the provided path.
- **Pause/Resume Simulation**: Pause and resume the drone's movement.
- **Seek Bar**: Jump to any point in the drone's path simulation.
- **Real-time Map**: Visualize the drones moving on a map.

## Note
- The coordinates should be provided in the format `latitude,longitude` per line.
- Ensure that the uploaded file has the correct format(`.txt`) and valid coordinates.

## Components
- **App**: The main component that integrates all other components and manages the state.
- **MapComponent**: Displays the map and the drones' positions.
- **InputForm**: Provides input fields for adding paths either through text input or file upload.
- **DroneControl**: Allows users to select drones and pause/resume their simulation.
- **SeekBar**: Provides a seek bar for jumping to specific points in the drone's path.

## Packages Used
- **React**: JavaScript library for building user interfaces.
- **react-google-maps**: Library for integrating google maps with React.

## Uses
This application can be used for:
- Simulating drone deliveries.
- Demonstrating pathfinding algorithms.
- Educational purposes for learning about drones and mapping.

## How to Run

### Prerequisites
- Node.js and npm should be installed on your machine.

### Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/drone-path-simulation.git
   cd drone-path-simulation
2. **Install dependencies**
   npm install
3. **Run the application**
   npm start
4. **Open your browser and navigate to**
   http://localhost:3000
   
## Folder Structure
drone-path-simulation/
├── public/
├── src/
│   ├── components/
│   │   ├── DroneControl.js
│   │   ├── InputForm.js
│   │   ├── MapComponent.js
│   │   ├── SeekBar.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...

## Main Files
- **App.js**: Main application logic, integrating all components.
- **MapComponent.js**: Map display using React Leaflet.
- **InputForm.js**: Form for inputting paths and uploading files.
- **DroneControl.js**: Drone control interface for pausing and resuming simulations.
- **SeekBar.js**: Seek bar component for jumping to specific points in the simulation.

## Conclusion
The Drone Path Simulation application is a versatile tool for visualizing and controlling drone paths on a map. Whether for educational purposes, demonstration of pathfinding algorithms, or simulating real-world drone deliveries, this application offers a user-friendly interface and a variety of features to suit your needs.