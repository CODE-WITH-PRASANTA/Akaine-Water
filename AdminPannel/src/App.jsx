import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurTeam from './Components/OurTeam/OurTeam';
import Gallery from './Components/Gallery/Gallery';
import Testiminial from './Components/Testiminial/Testiminial';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout

// Pages


import "./App.css";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Testimonial from "./pages/Testimonial/Testimonial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OurTeam />} />
        <Route path="/OurTeam" element={<OurTeam />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Testiminial" element={<Testiminial/>} />

        <Route element={<MainLayout />}>
          {/* Home */}
           <Route path="/" element={<Testimonial />} />
           <Route path="/shop" element={<ShopPosting/>} />
           <Route path="/contact" element={<Contact />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;