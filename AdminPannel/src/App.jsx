import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages / Components
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";

import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";

import "./App.css";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import Testiminial from "./Components/Testiminial/Testiminial";
import DashboardMain from "./Pages/DashboardMain/DashboardMain";
import ManageStock from "./Components/ManageStock/ManageStock";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITH Layout */}
        <Route element={<MainLayout />}>

          {/* Home Page */}
          <Route path="/" element={<OurTeam />} />

          <Route path="/team" element={<OurTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog-management" element={<BlogManagement />} />
         

          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallary" element={<Gallery />} />
          <Route path="/products/testimonials" element={<Testiminial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />


          <Route path="/wdms/dashboard" element={<DashboardMain />} />
          <Route path="/wdms/stock/manage" element={<ManageStock />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;