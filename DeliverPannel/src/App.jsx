import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import MainLayout from "./Layout/MainLayout/MainLayout";
import FailedDelivery from "./Component/FailedDelivery/FailedDelivery";



// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      

      
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/failed" element={<FailedDelivery />} />

          
        </Route>

             
      </Routes>
    </BrowserRouter>
  );
};

export default App;