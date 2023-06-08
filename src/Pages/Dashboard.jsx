import { useState, useEffect } from "react";
import axios from "axios";
import DriverCard from "../Components/DriverCard/DriverCard";
import FastestLap from "../Components/Results/Fastestlap.jsx";
import AverageQualify from "../Components/Results/AverageQualy";
import AveragePosition from "../Components/Results/AveragePosition";
import Standings from "../Components/Results/Standings";
import "../dashboard.css";
import PositionsGained from "../Components/Results/PositionsGained";
import UnfinishedRaces from "../Components/Results/UnfinishedRaces";
import PolePosition from "../Components/Results/PolePositions";
import GridPosition from "../Components/Results/Qualy";

const api = "http://localhost:5005";

const Dashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [rounds, setRounds] = useState([]);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/drivers`
        );
        const { drivers } = response.data;
        console.log(`drivers`, drivers);

        setDrivers(drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    }

    async function fetchRounds() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MONGO_URL}/api/results`
        );
        const { Races } = response.data.results[0];
        console.log(`form round`, Races);
        const rounds = Races.map((race) => race.round);
        console.log(`form rounds 2 `, rounds);

        setRounds(rounds);
      } catch (error) {
        console.error("Error fetching rounds:", error);
      }
    }
    fetchDrivers();
    fetchRounds();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <h2 className="section-title">Standings</h2>
      <div className="dashboard-section standings-section">
        <Standings />
      </div>

      <div className="dashboard-section driver-selection-section scrollbar">
        <select
          className="driver-selection"
          value={selectedDriver}
          onChange={handleDriverChange}
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.driverId} value={driver.driverId}>
              {driver.givenName} {driver.familyName}
            </option>
          ))}
        </select>
      </div>

      <div className="dashboard-section round-selection-section scrollbar">
        <select
          className="round-selection"
          value={selectedRound}
          onChange={handleRoundChange}
        >
          <option value="">Select a round</option>
          {rounds.map((round) => (
            <option key={round} value={round}>
              Round {round}
            </option>
          ))}
        </select>
      </div>
      <GridPosition
        selectedDriver={selectedDriver}
        selectedRound={selectedRound}
      />
      <DriverCard
        className="driver-card"
        drivers={drivers}
        selectedDriver={selectedDriver}
      />
      {selectedDriver && (
        <div className="dashboard-section driver-info-section">
          <FastestLap
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
          <AverageQualify
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
          <AveragePosition
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
          <PositionsGained
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
          <UnfinishedRaces
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
          <PolePosition
            selectedDriver={selectedDriver}
            selectedRound={selectedRound}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
