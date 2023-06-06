import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function NewDriver() {

  const [driverId, setDriverId] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [bio, setBio] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedDriverData = {
        driverId,
        givenName,
        familyName,
        dateOfBirth,
        nationality,
        bio,
      };

      const response = await axios.put(
        `${api}/api/drivers/${driverId}`,
        updatedDriverData
      );

      console.log("Driver updated:", response.data);
     
    } catch (error) {
      console.error("Error updating driver:", error.response.data.message);
    }
  };

  useEffect(() => {
    
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`${api}/api/drivers/${driverId}`);
        const driver = response.data;

        
        setGivenName(driver.givenName);
        setFamilyName(driver.familyName);
        setDateOfBirth(driver.dateOfBirth);
        setNationality(driver.nationality);
        setBio(driver.bio);
      } catch (error) {
        console.error("Error fetching driver:", error.response.data.message);
      }
    };

    
    fetchDriver();
  }, [driverId]);

  return (
    <div>
      <h1>Edit Driver</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Driver ID:
          <input
            type="text"
            value={driverId}
            onChange={(event) => setDriverId(event.target.value)}
          />
        </label>
        <label>
          Given Name:
          <input
            type="text"
            value={givenName}
            onChange={(event) => setGivenName(event.target.value)}
          />
        </label>
        <label>
          Family Name:
          <input
            type="text"
            value={familyName}
            onChange={(event) => setFamilyName(event.target.value)}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </label>
        <label>
          Nationality:
          <input
            type="text"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
          />
        </label>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewDriver;
