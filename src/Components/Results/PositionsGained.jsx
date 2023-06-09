import React, { useState, useEffect } from "react";
import axios from "axios";
import "./standings.css";



function PositionsGained({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [totalPositionsGained, setTotalPositionsGained] = useState(null);
  const [averagePositionsGained, setAveragePositionsGained] = useState(null);

  async function fetchResults() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MONGO_URL}/api/results`
      );
      const data = response.data;
      const allResults = data.results[0].Races.reduce(
        (all, race) => all.concat(race.Results),
        []
      );

      setRaces(data.results[0].Races);
      setResults(allResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    const filteredResults = results.filter(
      (result) => result.Driver.driverId === selectedDriver
    );

    let totalPositionsGained = 0;

    filteredResults.forEach((result) => {
      const grid = parseInt(result.grid);
      const position = parseInt(result.position);

      if (grid && position) {
        totalPositionsGained += grid - position;
      }
    });

    setTotalPositionsGained(totalPositionsGained);
    setAveragePositionsGained(
      (totalPositionsGained / filteredResults.length || 0).toFixed(3)
    );
  }, [results, selectedDriver]);

  const getColorClass = () => {
    if (averagePositionsGained > 0) {
      return "green";
    } else if (averagePositionsGained < 0) {
      return "red";
    }
    return "";
  };

  return (
    <div>
      <h2>Positions Gained</h2>
      <p>Total Positions Gained: {totalPositionsGained}</p>
      <p>Average Positions Gained: <span className={getColorClass()}>{averagePositionsGained}</span></p>
    </div>
  );
}

export default PositionsGained;
