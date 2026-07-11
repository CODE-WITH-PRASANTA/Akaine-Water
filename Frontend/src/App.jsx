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
import About from "./Pages/About/About";

=======
import Testimonial from "./Pages/Testimonial/Testimonial";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import Faq from "./Pages/Faq/Faq";
>>>>>>> f8d9a89f7e59f50c3de4d01378c72f7d63f4660c

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
<<<<<<< HEAD
        <Route path="/about" element={<About />} />
      
       
=======
        <Route path="/home" element={<Home />} />

        {/* Pricing */}
        <Route path="/plan" element={<PricingAndPlans />} />
        <Route
          path="/products/pricing"
          element={<PricingAndPlans />}
        />
>>>>>>> f8d9a89f7e59f50c3de4d01378c72f7d63f4660c

        {/* Main Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources/blog" element={<Blog />} />

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