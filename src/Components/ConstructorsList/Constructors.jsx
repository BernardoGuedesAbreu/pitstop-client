import { useState, useEffect } from "react";
import axios from "axios";
import './constructors.css'

const api = "http://localhost:5005";
function ConstructorsList() {
  const [constructors, setConstructors] = useState([]);

  async function fetchConstructors() {
    try {
      console.log("here");
      const response = await axios.get(`${api}/api/constructors`);
      console.log("kevin");
      const data = response.data;
      console.log(data);
      console.log("there");
      setConstructors(data.constructors);
    } catch (error) {
      console.error("Error fetching Constructors:", error);
    }
  }

  useEffect(() => {
    fetchConstructors();
  }, []);

  return (
    <div className="constructors-grid-container">
      <h1>Constructors</h1>
      <div className="constructors-grid">
        {constructors.map((constructor) => (
          <div key={constructor.constructorId} className="constructors-card">
          <img src={constructor.url} alt=""/>
            <h3>{constructor.name}</h3>
            <h3>{constructor.nationality}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConstructorsList;