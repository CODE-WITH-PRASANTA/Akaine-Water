import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout

// Pages


import "./App.css";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Testimonial from "./pages/Testimonial/Testimonial";
import Contact from "./Components/Contact/Contact";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
           <Route path="/" element={<Testimonial />} />
           <Route path="/contact" element={<Contact />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;