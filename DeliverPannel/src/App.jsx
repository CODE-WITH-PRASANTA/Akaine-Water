import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      
<Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;