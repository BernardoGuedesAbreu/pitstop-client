import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function Results() {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);

  async function fetchResults() {
    try {
      const response = await axios.get(`${api}/api/results`);
      const data = response.data;
      console.log("data", data.results[0].Races[0].Results);
      setRaces(data.results[0].Races); // Access the correct property in the response data
      setResults(data.results[0].Races[0].Results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h1>Results</h1>
      <ul>
        {races.map((result) => (
          <li key={result.number}>
            <div>
              <h2>{result.raceName}</h2>
            </div>
          </li>
        ))}

        {results.map((result) => (
          <p key={result.number}>{result.number}</p>
        ))}
      </ul>
    </div>
  );
}

export default Results;
