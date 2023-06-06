import { useState, useEffect } from 'react';
import axios from 'axios';
import DriverCard from '../components/DriverCard/DriverCard';
import FastestLap from '../Components/Results/Fastestlap.jsx';
import AverageQualify from '../Components/Results/AverageQualy';
import AveragePosition from '../Components/Results/AveragePosition';
import Standings from '../Components/Results/Standings';
import '../dashboard.css';
import PositionsGained from '../Components/Results/PositionsGained';
import UnfinishedRaces from '../Components/Results/UnfinishedRaces';
import PolePosition from '../Components/Results/PolePositions';

const api = 'http://localhost:5005';

const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  const handleDriverChange = (event) => {
    console.log(`selected driver`, event.target.value)
    setSelectedDriver(event.target.value);
  };

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get(`${api}/api/drivers`);
        const { drivers } = response.data;
        console.log('Fetched drivers:', drivers);
        setDrivers(drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    }

    fetchDrivers();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <h2 className="section-title">Standings</h2>
      <div className="dashboard-section standings-section">
        <Standings />
      </div>

      <div className="dashboard-section driver-selection-section">
        <select className="driver-selection" value={selectedDriver} onChange={handleDriverChange}>
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.driverId} value={driver.driverId}>
              {driver.givenName} {driver.familyName}
            </option>
          ))}
        </select>
      </div>
        <DriverCard className="driver-card" drivers={drivers} selectedDriver={selectedDriver}/>
      {selectedDriver && (
        <div className="dashboard-section driver-info-section">
          <FastestLap selectedDriver={selectedDriver} />
          <AverageQualify selectedDriver={selectedDriver} />
          <AveragePosition selectedDriver={selectedDriver} />
          <PositionsGained selectedDriver={selectedDriver} />
          <UnfinishedRaces selectedDriver={selectedDriver} />
          <PolePosition selectedDriver={selectedDriver} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
