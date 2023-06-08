import React, { useState, useEffect } from "react";
import axios from "axios";
import "./standings.css";



function Standings() {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/results`
        );
        const data = response.data;

        const allResults = data.results[0].Races.reduce((all, race) => {
          const results = race.Results;
          return all.concat(results);
        }, []);

        // Calculate total points for each driver
        const driverPoints = {};
        allResults.forEach((result) => {
          const driverId =
            result.Driver.givenName + " " + result.Driver.familyName;
          const points = parseInt(result.points);

          if (driverPoints[driverId]) {
            driverPoints[driverId] += points;
          } else {
            driverPoints[driverId] = points;
          }
        });

        // Sort drivers by total points
        const sortedStandings = Object.entries(driverPoints)
          .map(([driverId, totalPoints]) => ({
            driverId,
            totalPoints,
          }))
          .sort((a, b) => b.totalPoints - a.totalPoints);

        setStandings(sortedStandings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    }

    fetchStandings();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Driver</th>
            <th></th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((driver) => (
            <tr key={driver.driverId}>
              <td className="td-driver">{driver.driverId}</td>
              <td>
                ..........................................
              </td>
              <td>{driver.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;
