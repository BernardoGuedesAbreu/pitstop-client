import { useState, useEffect } from "react";
import axios from "axios";
import DriverCard from "../Components/DriverCard/DriverCard";
import FastestLap from "../Components/Results/Fastestlap.jsx";
import AverageQualify from "../Components/Results/AverageQualy";
import AveragePosition from "../Components/Results/AveragePosition";
import Standings from "../Components/Results/Standings";
import "../dashboard.css";
import PositionsGained from "../Components/Results/PositionsGained";
import UnfinishedRaces from "../Components/Results/UnfinishedRaces";
import PolePosition from "../Components/Results/PolePositions";




const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState("");
  
  const [drivers, setDrivers] = useState([]);
  

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/drivers`
        );
        const { drivers } = response.data;
        console.log(`drivers`, drivers);

        setDrivers(drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    }

  
    fetchDrivers();
   
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="first-section">
        <div className="standings-zone">
      <h2 className="section-title">Standings</h2>
      <div className="dashboard-section standings-section">
        <Standings />
      </div>
      </div>
      <div className="dashboard-section driver-selection-section scrollbar">
        <select
          className="driver-selection"
          value={selectedDriver}
          onChange={handleDriverChange}
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.driverId} value={driver.driverId}>
              {driver.givenName} {driver.familyName}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="second-section">
      <DriverCard className="driver-card" drivers={drivers} selectedDriver={selectedDriver}/>
      {selectedDriver && (
        <div className="dashboard-section driver-info-section1">
          <FastestLap selectedDriver={selectedDriver}/>
          <AverageQualify selectedDriver={selectedDriver}/>
          <AveragePosition selectedDriver={selectedDriver}/>
        </div>
      )}
        {selectedDriver && (
        <div className="dashboard-section driver-info-section2">
          <PositionsGained selectedDriver={selectedDriver}/>
          <UnfinishedRaces selectedDriver={selectedDriver}/>
          <PolePosition selectedDriver={selectedDriver}/>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
