import { useState, useEffect } from "react";
import axios from "axios";



function GridPosition({ selectedDriver, selectedRound }) {
  const [results, setResults] = useState([]);
  const [gridPosition, setGridPosition] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/results`
        );
        const data = response.data;
        console.log(`data`, data);
        const allResults = data.results[0].Races.reduce(
          (all, race) => all.concat(race),
          []
        );

        console.log("Fetched results:", allResults);

        setResults(allResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }

    fetchResults();
  }, []);

  useEffect(() => {
    const filteredResults = results.filter(
      (result) =>
        result.Results[0].Driver.driverId === selectedDriver &&
        result.race &&
        result.round === selectedRound
    );
    console.log(`filtered`, filteredResults);

    const grid = filteredResults.length > 0 ? filteredResults[0].grid : null;

    setGridPosition(grid);
  }, [results, selectedDriver, selectedRound]);

  return (
    <div>
      <h2>Grid Position</h2>
      {gridPosition !== null ? <p>{gridPosition}</p> : <p>No data available</p>}
    </div>
  );
}

export default GridPosition;
