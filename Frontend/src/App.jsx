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
import About from "./Pages/About/About";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
<<<<<<< HEAD

// Other Pages
<<<<<<< HEAD
import Testimonial from "./pages/Testimonial/Testimonial";
import Cart from "./pages/Cart/Cart";
import Cheakout from "./pages/Cheakout/Cheakout";
import Faq from "./pages/Faq/Faq";
<<<<<<< HEAD
import About from "./Pages/About/About";


=======
import MainTeam from "./Pages/MainTeam/MainTeam";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";
>>>>>>> caff59ae6fe819a177b1379a3462d0a5bbad0041
=======
=======
import MainTeam from "./Pages/MainTeam/MainTeam";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";

// Other Pages
>>>>>>> 40f9ea368375c01937174bbf1385ac85da1187b1
import Testimonial from "./Pages/Testimonial/Testimonial";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import Faq from "./Pages/Faq/Faq";

function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Topbar />
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
<<<<<<< HEAD
<<<<<<< HEAD
      
       
        <Route path="/home" element={<Home />} />
=======
        
>>>>>>> faf7d3c0c5098345fae848ed9ed5c82e7752a596
=======
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
>>>>>>> 40f9ea368375c01937174bbf1385ac85da1187b1

        {/* Pricing */}
        <Route path="/plan" element={<PricingAndPlans />} />
        <Route
          path="/products/pricing"
          element={<PricingAndPlans />}
        />

        {/* Blog */}
        <Route path="/resources/blog" element={<Blog />} />

        {/* Team */}
        <Route path="/resources/team" element={<MainTeam />} />

        {/* Gallery */}
        <Route path="/resources/gallary" element={<GalaryMain />} />

        {/* FAQs */}
        <Route path="/resources/faqs" element={<Faq />} />

        {/* Testimonials */}
        <Route
          path="/products/testimonials"
          element={<Testimonial />}
        />

        {/* Cart & Checkout */}
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Cheakout />} />

        {/* Individual Components (Optional) */}
        <Route path="/team-component" element={<OurTeam />} />
        <Route path="/gallery-component" element={<AkaineGalary />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;