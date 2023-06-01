import  { useState, useEffect } from 'react';
import axios from 'axios';

function DriverList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    try {
      const response = await axios.get('/api/drivers');
      const data = response.data;
      console.log(data)
      setDrivers(data.drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  }

  return (
    <div>
      <h1>Driver List</h1>
      <ul>
        {drivers.map(driver => (
          <li key={driver.driverId}>
            {driver.givenName} {driver.familyName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverList;
