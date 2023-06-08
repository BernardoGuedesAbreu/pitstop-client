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
        if (drivers.length > 0) {
          setSelectedDriver(drivers[0].driverId);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    }


    fetchDrivers();

  }, []);

  return (
    <div className="dashboard">
      <div className="first-section">
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
        <div className="standings-zone">
          <h2 className="section-title">Standings</h2>
          <div className="dashboard-section standings-section">
            <Standings />
          </div>
        </div>
        
      </div>
      <div className="second-section">
        <DriverCard className="driver-card" drivers={drivers} selectedDriver={selectedDriver} />
        <div className="average-qual-pos">
        {selectedDriver && (
          <div className="dashboard-section driver-info-average-qualify">
            <AverageQualify selectedDriver={selectedDriver} />
          </div>
        )}
        {selectedDriver && (
          <div className="dashboard-section driver-info-average-position">
            <AveragePosition selectedDriver={selectedDriver} />
          </div>
        )}
        {selectedDriver && (
          <div className="dashboard-section driver-positions-gained">
            <PositionsGained selectedDriver={selectedDriver} />
          </div>
        )}
        </div>
        <div className="fastestlap-dnf-pole">
        {selectedDriver && (
          <div className="dashboard-section driver-pole-position">
            <PolePosition selectedDriver={selectedDriver} />
          </div>
        )}
        
        {selectedDriver && (
          <div className="dashboard-section driver-unfinished-races">
            <UnfinishedRaces selectedDriver={selectedDriver} />
          </div>
        )}
        {selectedDriver && (
          <div className="dashboard-section driver-info-fastest-lap">
            <FastestLap selectedDriver={selectedDriver} />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
