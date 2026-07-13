import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages / Components
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import Blog from "./Components/Blog/Blog";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import Testiminial from "./Components/Testiminial/Testiminial";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* All pages using Main Layout */}
        <Route element={<MainLayout />}>

          {/* Home */}
          <Route path="/" element={<OurTeam />} />

          {/* Main Pages */}
          <Route path="/team" element={<OurTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* Blog Posting */}
          <Route path="/blog-posting" element={<BlogPosting />} />

          {/* Blog Management */}
          <Route path="/blog-management" element={<BlogManagement />} />

          {/* Additional Pages */}
          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallery" element={<Gallery />} />
          <Route path="/products/testimonials" element={<Testiminial />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;