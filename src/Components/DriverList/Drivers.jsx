import { useState, useEffect } from "react";
import axios from "axios";
const api = "http://localhost:5005";
function DriverList() {
  const [drivers, setDrivers] = useState([]);

  async function fetchDrivers() {
    try {
      console.log("here");
      const response = await axios.get(`${api}/api/drivers`);
      console.log("kevin");
      const data = response.data;
      console.log(data);
      console.log("there");
      setDrivers(data.drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div>
      <h1>Driver List</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.driverId}>
            {driver.givenName} {driver.familyName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverList;