import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout

// Pages


import "./App.css";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Testimonial from "./pages/Testimonial/Testimonial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import DashBoard from "./Pages/DashBoard/DashBoard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
           <Route path="/" element={<Testimonial />} />
           <Route path="/shop" element={<ShopPosting/>} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/" element={<DashBoard />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;