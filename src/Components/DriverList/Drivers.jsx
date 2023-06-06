import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./drivers.css";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

const api = "http://localhost:5005";

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const { user } = useContext(AuthContext);

  async function fetchDrivers() {
    try {
      const response = await axios.get(`${api}/api/drivers`);
      const data = response.data;
      console.log(data);
      setDrivers(data.drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  
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
      <h1>Driver List</h1>
     
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
              <div>
                <button onClick={() => handleDeleteDriver(driver._id)}>
                  Delete
                </button>
                <Link to={`/drivers/${driver._id}`}>Edit</Link>
              </div>
            )}
          </div>
        ))}
      </div>
      {user && user.role === "admin" && (
        <Link to={"/new-driver"}>Create a driver</Link>
      )}
    </div>
  );
}

export default DriverList;

