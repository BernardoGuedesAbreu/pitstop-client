import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./drivers.css";
import { AuthContext } from "../../context/auth.context";

const api = "http://localhost:5005";

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const { user } = useContext(AuthContext);

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

  const handleCreateDriver = async () => {
    try {
      const newDriverData = {
        driverId: "12345",
        givenName: "John",
        familyName: "Doe",
        dateOfBirth: new Date(),
        nationality: "USA",
      };

      const storedToken = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${storedToken}` };

      const response = await axios.post(`${api}/api/drivers`, newDriverData, {
        headers: headers,
      });
      const newDriver = response.data.driver;
      setDrivers([...drivers, newDriver]);
    } catch (error) {
      console.error("Error creating driver:", error.response.data.message);
    }
  };

  const handleDeleteDriver = async (driverId) => {
    const storedToken = localStorage.getItem("authToken");
    const headers = { Authorization: `Bearer ${storedToken}` };
    try {
      await axios.delete(`${api}/api/drivers/${driverId}`, {
        headers: headers,
      });
      const response = await axios.get(`${api}/api/drivers`);
      const data = response.data;
      console.log("updated drivers", data.drivers)
      setDrivers(data.drivers);
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <div className="drivers-grid-container">
      <h1>Drivers</h1>
      {user && user.role === "admin" && (
        <button onClick={handleCreateDriver}>Create Driver</button>
      )}
      <div className="drivers-grid">
        {drivers.map((driver) => (
          <div key={driver.driverId} className="drivers-card">
            <img src={driver.url} alt="picture" />
            <h3>
              {driver.givenName} {driver.familyName}
            </h3>
            <h4>{driver.nationality}</h4>
            <h4>{driver.dateOfBirth}</h4>
            {user && user.role === "admin" && (
              <button onClick={() => handleDeleteDriver(driver._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverList;
