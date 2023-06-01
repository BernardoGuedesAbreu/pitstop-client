import { useState } from 'react';
import DriverCard from './DriverCard';

const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState('');

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <select value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Select a driver</option>
        <option value="driver1">Driver 1</option>
        <option value="driver2">Driver 2</option>
        <option value="driver3">Driver 3</option>
        {/* Add more options for each driver */}
      </select>
      {selectedDriver && <DriverCard selectedDriver={selectedDriver} />}
    </div>
  );
};

export default Dashboard;

