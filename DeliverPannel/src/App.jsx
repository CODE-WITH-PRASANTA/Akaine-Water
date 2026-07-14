import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers/Customers";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Customers />} />

      
      </Routes>
    </BrowserRouter>
  );
};

export default App;