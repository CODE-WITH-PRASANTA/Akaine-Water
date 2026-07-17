import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Components / Pages
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";
import Testiminial from "./Components/Testiminial/Testiminial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import Dashboards from "./Pages/Dashboards/Dashboards";
import Blog from "./Components/Blog/Blog";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import DashboardMain from "./Pages/DashboardMain/DashboardMain";
import ManageStock from "./Components/ManageStock/ManageStock";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper */}
        <Route element={<MainLayout />}>
          {/* Home Page */}
          <Route path="/" element={<Testimonial />} />

          {/* Main Pages */}
          <Route path="/team" element={<OurTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* Blog Routes */}
          <Route path="/blog-posting" element={<BlogPosting />} />
          <Route path="/blog-management" element={<BlogManagement />} />

          {/* Dashboard & Resources */}
          <Route path="/dashboard" element={<Dashboards />} />
          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallery" element={<Gallery />} />
          <Route path="/products/testimonials" element={<Testiminial />} />

          {/* WDMS Routes */}
          <Route path="/wdms/dashboard" element={<DashboardMain />} />
          <Route path="/wdms/stock/manage" element={<ManageStock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;