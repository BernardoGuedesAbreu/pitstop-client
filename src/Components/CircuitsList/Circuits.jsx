import { useState, useEffect } from "react";
import axios from "axios";
import './circuits.css'

const api = "http://localhost:5005";
function CircuitsList() {
  const [circuits, setCircuits] = useState([]);

  async function fetchCircuits() {
    try {
      console.log("here");
      const response = await axios.get(`${api}/api/circuits`);
      console.log("kevin");
      const data = response.data;
      console.log(data);
      console.log("there");
      setCircuits(data.circuits[0].Circuits);
    } catch (error) {
      console.error("Error fetching Circuits:", error);
    }
  }

  useEffect(() => {
    fetchCircuits();
  }, []);

  return (
    <div className="circuits-grid-container">
      <h1>Circuits</h1>
      <div className="circuits-grid">
        {circuits.map((circuits) => (
          <div key={circuits.circuitsId} className="circuits-card">
            <img src={circuits.url}/>
            <h3>{circuits.circuitName}</h3>
            <h4>{circuits.Location.country}, {circuits.Location.locality}</h4>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CircuitsList;