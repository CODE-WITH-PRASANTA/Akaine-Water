import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages / Components
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";

import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";

import "./App.css";
import Testiminial from "./Components/Testiminial/Testiminial";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITH Layout */}
        <Route element={<MainLayout />}>

          {/* Home Page */}
         

          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallary" element={<Gallery />} />
          <Route path="/products/testimonials" element={<Testiminial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;