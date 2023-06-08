/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";



function AveragePosition({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [averagePosition, setAveragePosition] = useState(null);

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

    let totalPosition = 0;
    let count = 0;

    filteredResults.forEach((result) => {
      if (result.position) {
        totalPosition += parseInt(result.position);
        count++;
      }
    });

    const averagePositionValue =
      count > 0 ? Math.floor(totalPosition / count) : 0;

    setAveragePosition(averagePositionValue);
  }, [results, selectedDriver]);

  return (
    <div>
      <h2>Average Position</h2>
      {averagePosition !== null && <p>{averagePosition.toFixed(0)}</p>}
    </div>
  );
}

export default AveragePosition;
