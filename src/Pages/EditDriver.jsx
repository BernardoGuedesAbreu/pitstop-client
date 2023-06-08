import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import '../dashboard.css';


function EditDriverPage() {
  const navigate = useNavigate();
  const { authenticateUser, user } = useContext(AuthContext);
  const [driverData, setDriverData] = useState({
    driverId: "",
    givenName: "",
    familyName: "",
    dateOfBirth: "",
    nationality: "",
  });
  const { driverId } = useParams();

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/drivers/${driverId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log(`response`, response.data);
        const driver = response.data;
        console.log(`driver data`, driver);

        setDriverData({
          driverId: driver.driverId,
          givenName: driver.givenName,
          familyName: driver.familyName,
          dateOfBirth: driver.dateOfBirth,
          nationality: driver.nationality,
        });
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, [driverId]);

  const handleInputChange = (event) => {
    setDriverData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${import.meta.env.VITE_MONGO_URL}/api/drivers/${driverId}`,
        driverData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log("Driver updated:", response.data.driver);

      navigate("/drivers");
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  return (
    <div className="edit-driver-container">
      <h1 className="edit-header">Edit Driver</h1>
      <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="driverId">Driver ID:</label>
          <input
            type="text"
            id="driverId"
            name="driverId"
            value={driverData.driverId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="givenName">Given Name:</label>
          <input
            type="text"
            id="givenName"
            name="givenName"
            value={driverData.givenName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            name="familyName"
            value={driverData.familyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={driverData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={driverData.nationality}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="edit-driver">Update Driver</button>
      </form>
      </div>
    </div>
  );
}

export default EditDriverPage;
