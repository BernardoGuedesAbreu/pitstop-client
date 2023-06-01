import { useState, useEffect } from 'react';
import axios from 'axios';
import DriverCard from '../components/DriverCard/DriverCard';

const api = 'http://localhost:5005';

const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  const handleDriverChange = (event) => {
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
    <div>
      <h2>Dashboard</h2>
      <select value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Select a driver</option>
        {drivers.map((driver) => (
          <option key={driver.driverId} value={driver.driverId}>
            {driver.givenName} {driver.familyName}
          </option>
        ))}
      </select>
      {selectedDriver && <DriverCard drivers={drivers} selectedDriver={selectedDriver} />}
    </div>
  );
};

export default Dashboard;
