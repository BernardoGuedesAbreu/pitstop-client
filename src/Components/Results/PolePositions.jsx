import React, { useState, useEffect } from "react";
import axios from "axios";



function PolePosition({ selectedDriver }) {
  const [results, setResults] = useState([]);
  const [polePositionCount, setPolePositionCount] = useState(0);

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

    const polePositionCount = filteredResults.reduce(
      (count, result) => count + (parseInt(result.grid) === 1 ? 1 : 0),
      0
    );

    setPolePositionCount(polePositionCount);
  }, [results, selectedDriver]);

  return (
    <div>
      <h2>Pole Positions</h2>
      <p>Number of Pole Positions: {polePositionCount}</p>
    </div>
  );
}

export default PolePosition;
