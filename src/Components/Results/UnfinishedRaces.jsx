/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const api = "http://localhost:5005";

function UnfinishedRaceCount({ selectedDriver }) {
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [unfinishedRaceCount, setUnfinishedRaceCount] = useState(0);

  async function fetchResults() {
    try {
      const response = await axios.get(`${api}/api/results`);
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

    const unfinishedRaces = filteredResults.filter(
      (result) =>
        result.status !== "Finished" &&
        result.status !== "+1 Lap" &&
        result.status !== "+2 Laps" &&
        result.status !== "+3 Laps"
    );
    const numUnfinishedRaces = unfinishedRaces.length;
    console.log("Number of Unfinished Races:", numUnfinishedRaces);

    setUnfinishedRaceCount(numUnfinishedRaces);
  }, [results, selectedDriver]);

  return (
    <div>
      <h2>Number of unfinished Races (DNF) </h2>
      <p>{unfinishedRaceCount}</p>
    </div>
  );
}

export default UnfinishedRaceCount;
