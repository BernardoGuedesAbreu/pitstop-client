import { useState, useEffect } from "react";
import axios from "axios";
import './drivers.css'

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
      setDrivers(data.drivers[0].Drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="drivers-grid-container">
      <h1>Driver List</h1>
      <div className="drivers-grid">
        {drivers.map((driver) => (
          <div key={driver.driverId} className="drivers-card">
            <img src={driver.url} alt="picture"/>
            <h3>{driver.givenName} {driver.familyName}</h3>
            <h3>{driver.nationality}</h3>
            <h3>{driver.dateOfBirth}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverList;
