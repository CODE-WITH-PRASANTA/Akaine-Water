import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";

// Components
import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";
import OurTeam from "./Component/OurTeam/OurTeam";

// Pages
import Home from "./Pages/Home/Home";
<<<<<<< HEAD
import PricingAndPlans from './Pages/PricingAndPlans/PricingAndPlans';
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
=======
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";

// Other Pages
<<<<<<< HEAD
import Testimonial from "./pages/Testimonial/Testimonial";
import Cart from "./pages/Cart/Cart";
import Cheakout from "./pages/Cheakout/Cheakout";
import Faq from "./pages/Faq/Faq";
import MainTeam from "./Pages/MainTeam/MainTeam";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";
=======
import Testimonial from "./Pages/Testimonial/Testimonial";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import Faq from "./Pages/Faq/Faq";
import About from "./Pages/About/About";
>>>>>>> faf7d3c0c5098345fae848ed9ed5c82e7752a596
>>>>>>> caff59ae6fe819a177b1379a3462d0a5bbad0041

function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Topbar />
      <Navbar />

      {/* Routes */}
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<PricingAndPlans />} />
=======
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
>>>>>>> caff59ae6fe819a177b1379a3462d0a5bbad0041
        

        {/* Pricing */}
        
        <Route
          path="/products/pricing"
          element={<PricingAndPlans />}
        />

        {/* Main Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources/blog" element={<Blog />} />

        {/* Components */}
        <Route path="/resources/team" element={<MainTeam/>} />
        <Route path="/resources/gallary" element={<GalaryMain/>} />
        

        {/* Other Pages */}
        <Route path="/products/testimonials" element={<Testimonial />} />
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Cheakout />} />
        <Route path="/resources/faqs" element={<Faq />} />
        {/* Resources */}
        <Route path="/resources/faqs" element={<Faq />} />
        <Route path="/resources/team" element={<OurTeam />} />
        <Route path="/resources/gallary" element={<AkaineGalary />} />

        {/* Testimonials */}
        <Route
          path="/products/testimonials"
          element={<Testimonial />}
        />

        {/* Shop */}
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Cheakout />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;