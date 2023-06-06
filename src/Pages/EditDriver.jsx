import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const api = "http://localhost:5005";

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
        const response = await axios.get(`${api}/api/drivers/${driverId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        console.log(`response`,response.data)
        const driver = response.data;
        console.log(`driver data`, driver)

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
        `${api}/api/drivers/${driverId}`,
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
    <h1>Edit Driver</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <button type="submit">Update Driver</button>
    </form>
  </div>
);
}

export default EditDriverPage;
