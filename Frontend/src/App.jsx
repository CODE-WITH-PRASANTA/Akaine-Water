import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Layout Components
import Navbar from "./Component/Navbar/Navbar";
import Topbar from "./Component/Topbar/Topbar";
import Footer from "./Component/Footer/Footer";

// Pages
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import Testimonial from "./pages/Testimonial/Testimonial";
import Cart from "./pages/Cart/Cart";
import Cheakout from "./pages/Cheakout/Cheakout";
import Faq from "./pages/Faq/Faq";







function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Main Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/plan" element={<PricingAndPlans />} />

        {/* Other Pages */}
        <Route path="/products/testimonials" element={<Testimonial />} />
        <Route path="/shop/cart" element={<Cart/>}/>
        <Route path="/shop/checkout" element={<Cheakout/>}/>
        <Route path="/resources/faqs"element={<Faq/>}/>
        
        
       
        

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;