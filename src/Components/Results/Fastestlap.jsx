/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function FastestLap({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);

  async function fetchResults() {
    try {
      const response = await axios.get(`${api}/api/results`);
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

  console.log("results: ",results);
  const filteredResults = results.filter(
    (result) => result.Driver.driverId === selectedDriver
  );
  console.log("filtered: ", filteredResults);

  return (
    <div>
      <h1>Fastest Lap</h1>
      <ul>
        {races.map((race) => (
          <li key={race.round}>
            <div>
              <h2>{race.raceName}</h2>
              <ul>
                {filteredResults.map((result) => (
                  <li key={result.number}>
                    <div>
                      <p>Position: {result.position}</p>
                      <p>Points: {result.points}</p>
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

export default FastestLap;
