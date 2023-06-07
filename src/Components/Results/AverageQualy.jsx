/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function AverageQualify({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [averageGrid, setAverageGrid] = useState(null);

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

    let totalGrid = 0;
    let count = 0;

    filteredResults.forEach((result) => {
      if (result.grid) {
        totalGrid += parseInt(result.grid);
        count++;
      }
    });

    const averageGridPosition = count > 0 ? Math.floor(totalGrid / count) : 0;

    setAverageGrid(averageGridPosition);
  }, [results, selectedDriver]);

  return (
    <div>
      <h2>Average Qualify Position</h2>
      {averageGrid !== null && <p>{averageGrid.toFixed(0)}</p>}
    </div>
  );
}

export default AverageQualify;
