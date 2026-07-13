import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Components / Pages
import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";
<<<<<<< HEAD
import Testiminial from "./Components/Testiminial/Testiminial";
=======
>>>>>>> ddc2b35b615bad704ad4c42fae2847764e6a13e5
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import Dashboards from "./Pages/Dashboards/Dashboards";
import Blog from "./Components/Blog/Blog";
<<<<<<< HEAD
=======
import BlogPosting from "./Components/BlogPosting/BlogPosting";
>>>>>>> ddc2b35b615bad704ad4c42fae2847764e6a13e5
import BlogManagement from "./Components/BlogManagement/BlogManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Routes with Main Layout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<OurTeam />} />

          {/* Main Routes */}
=======
        {/* All pages using Main Layout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Testimonial />} />

          {/* Main Pages */}
>>>>>>> ddc2b35b615bad704ad4c42fae2847764e6a13e5
          <Route path="/team" element={<OurTeam />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/shop" element={<ShopPosting />} />
          <Route path="/contact" element={<Contact />} />
<<<<<<< HEAD
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog-management"
            element={<BlogManagement />}
          />

          {/* Additional Routes */}
          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallary" element={<Gallery />} />
=======
          <Route path="/dashboard" element={<Dashboards />} />
          <Route path="/blog" element={<Blog />} />

          {/* Blog Posting */}
          <Route path="/blog-posting" element={<BlogPosting />} />

          {/* Blog Management */}
          <Route path="/blog-management" element={<BlogManagement />} />

          {/* Additional Pages */}
          <Route path="/resources/team" element={<OurTeam />} />
          <Route path="/resources/gallery" element={<Gallery />} />
>>>>>>> ddc2b35b615bad704ad4c42fae2847764e6a13e5
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