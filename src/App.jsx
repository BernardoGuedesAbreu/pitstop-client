import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import DriverList from "./Components/Drivers";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/drivers" element={<DriverList />} />

      </Routes>
    </div>
  );
}

export default App;
