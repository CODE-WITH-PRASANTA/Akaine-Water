import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";



// Components
import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";
import OurTeam from "./Component/OurTeam/OurTeam";

// Main Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import MainTeam from "./Pages/MainTeam/MainTeam";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";
import OurServices from "./Pages/OurServices/OurServices";
import WhiteQuartz from "./Pages/WhiteQuartz/WhiteQuartz";

// Other Pages
import Testimonial from "./Pages/Testimonial/Testimonial";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import Faq from "./Pages/Faq/Faq";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";


function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Topbar />
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Main Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/products/pricing" element={<PricingAndPlans />} />
        

        {/* Pricing */}
       

        {/* Blog */}
        <Route path="/resources/blog" element={<Blog />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        {/* Resources */}
        <Route path="/resources/team" element={<MainTeam />} />
        <Route path="/resources/gallary" element={<GalaryMain />} />
        <Route path="/resources/faqs" element={<Faq />} />

        {/* Testimonials */}
        <Route
          path="/products/testimonials"
          element={<Testimonial />}
        />

        {/* Shop */}
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Cheakout />} />

        {/* Services */}
        <Route path="/services/all" element={<OurServices />} />

        {/* Product */}
        <Route path="/whitequartz" element={<WhiteQuartz />} />

        {/* Optional Components */}
        <Route path="/team-component" element={<OurTeam />} />
        <Route path="/gallery-component" element={<AkaineGalary />}/>
      
  
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;