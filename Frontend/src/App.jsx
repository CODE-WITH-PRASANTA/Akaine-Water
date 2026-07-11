import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "./App.css";
import Home from "./Pages/Home/Home";
import PricingAndPlans from './Pages/PricingAndPlans/PricingAndPlans';

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/plan" element={<PricingAndPlans />} />
        
      
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;