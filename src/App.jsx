import "./App.css";
import {Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import DriverList from "./Components//DriverList/Drivers";
import Dashboard from "./Pages/Dashboard";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/drivers" element={<DriverList />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </div>
  );
}

export default App;
