import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";

// Pages
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources/blog" element={<Blog />} />
        <Route path="/products/pricing" element={<PricingAndPlans />} />
        <Route path="/resources/gallary" element={<AkaineGalary />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;