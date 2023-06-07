/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function FastestLap({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [averageFastestLapTime, setAverageFastestLapTime] = useState(null);
  const [averageFastestLapSpeed, setAverageFastestLapSpeed] = useState(null);

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

  useEffect(() => {
    const filteredResults = results.filter(
      (result) => result.Driver.driverId === selectedDriver
    );

    let totalFastestLapTime = 0;
    let totalFastestLapSpeed = 0;
    let count = 0;

    filteredResults.forEach((result) => {
      if (result.FastestLap && result.FastestLap.Time.time) {
        const lapTime = result.FastestLap.Time.time;
        const lapTimeParts = lapTime.split(":");
        const minutes = parseInt(lapTimeParts[0]);
        const seconds = parseFloat(lapTimeParts[1]);

        const lapTimeInSeconds = minutes * 60 + seconds;
        totalFastestLapTime += lapTimeInSeconds;
        totalFastestLapSpeed += parseFloat(result.FastestLap.AverageSpeed.speed);
        count++;
      }
    });

    const averageTime = count > 0 ? totalFastestLapTime / count : 0;
    const averageSpeed = count > 0 ? totalFastestLapSpeed / count : 0;

    setAverageFastestLapTime(averageTime);
    setAverageFastestLapSpeed(averageSpeed);
  }, [results, selectedDriver]);

  return (
    <div>
      <h2>Fastest Lap</h2>
      <br></br>
      <div>
        {averageFastestLapTime !== null && (
          <p>Average Fastest Lap Time: {averageFastestLapTime.toFixed(3)} seconds</p>
        )}
        {averageFastestLapSpeed !== null && (
          <p>Average Fastest Lap Speed: {averageFastestLapSpeed.toFixed(3)} km/h</p>
        )}
      </div>
    </div>
  );
}

export default FastestLap;
