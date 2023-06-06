import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const api = "http://localhost:5005";

function NewDriverPage() {
  const navigate = useNavigate();
  const { authenticateUser, user } = useContext(AuthContext);
  const [driverData, setDriverData] = useState({
    driverId: "",
    givenName: "",
    familyName: "",
    dateOfBirth: "",
    nationality: "",
  });

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
      const response = await axios.post(`${api}/api/drivers`, driverData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log("New driver created:", response.data.driver);

      navigate("/drivers");
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  return (
    <div className="new-driver-container">
      <h1>Create New Driver</h1>
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
        <button type="submit">Create Driver</button>
      </form>
    </div>
  );
}

export default NewDriverPage;
