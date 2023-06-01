import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DriverList from "./Components/Drivers";


function App() {
  return (
    <div>
    <Routes>
    <Route path="/drivers" element={<DriverList />} />
    
      </Routes>
      </div>
  );
}

export default App;
