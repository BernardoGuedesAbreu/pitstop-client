import "./App.css";
import {Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import DriverList from "./Components//DriverList/Drivers";
import Dashboard from "./Pages/Dashboard";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NewDriverPage from "./Pages/NewDriver";
import EditDriver from "./Pages/EditDriver";
import ConstructorsList from "./Components/ConstructorsList/Constructors";
import CircuitsList from "./Components/CircuitsList/Circuits";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/circuits" element={<CircuitsList />}/>
        <Route path="/constructors" element={<ConstructorsList />}/>
        <Route path="/drivers" element={<DriverList />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route exact path="/new-driver" element={<NewDriverPage/>} />
        <Route path="/edit-driver/:driverId" element={<EditDriver/>} />
      </Routes>
    </div>
  );
}

export default App;
