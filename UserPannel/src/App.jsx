import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDashboard from "./Pages/MainDashboard/MainDashboard";


// Layout


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<MainDashboard/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;