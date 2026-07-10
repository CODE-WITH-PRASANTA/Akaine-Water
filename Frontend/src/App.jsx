import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "./App.css";
import Home from "./Pages/Home/Home";
import PricingAndPlans from './Pages/PricingAndPlans/PricingAndPlans';

function App() {
  // You have useState imported, so you can define any state here if needed
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/Home" element={<Home />} />
        
        {/* Pricing and Plans Route */}
        <Route path="/plan" element={<PricingAndPlans />} />
        
        {/* Optional: Default root route redirecting to Home */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;