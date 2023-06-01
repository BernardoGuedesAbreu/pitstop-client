import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DriverList from "./Components/Drivers";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/drivers" element={<DriverList />} />
    
      </Routes>
      </BrowserRouter>
  );
}

export default App;
