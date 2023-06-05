import "./App.css";
import {Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import DriverList from "./Components//DriverList/Drivers";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/drivers" element={<DriverList />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
