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
import Blog from "./Components/Blog/Blog";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Main Layout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<OurTeam />} />

          {/* Main Routes */}
          <Route path="/team" element={<OurTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog-management"
            element={<BlogManagement />}
          />

          {/* Additional Routes */}
          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallary" element={<Gallery />} />
          <Route
            path="/products/testimonials"
            element={<Testiminial />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;