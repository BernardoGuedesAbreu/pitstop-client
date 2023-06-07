import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function Results() {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);

  async function fetchResults() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MONGO_URL}/api/results`
      );
      const data = response.data;
      const allResults = data.results.reduce(
        (all, race) => all.concat(race.Races[0].Results),
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

  return (
    <div>
      <h1>Results</h1>
      <ul>
        {races.map((race) => (
          <li key={race.round}>
            <div>
              <h2>{race.raceName}</h2>
              <p>Round: {race.round}</p>
              <p>Season: {race.season}</p>
              <ul>
                {race.Results.map((result) => (
                  <li key={result.number}>
                    <div>
                      <h3>
                        {result.Driver.givenName} {result.Driver.familyName}
                      </h3>
                      <p>Position: {result.position}</p>
                      <p>Points: {result.points}</p>
                      <p>Constructor: {result.Constructor.name}</p>
                      <p>Grid: {result.grid}</p>

                      {result.FastestLap && (
                        <div>
                          <p>Fastest Lap Time: {result.FastestLap.Time.time}</p>
                          <p>
                            Fastest Lap Average Speed:{" "}
                            {result.FastestLap.AverageSpeed.speed}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
