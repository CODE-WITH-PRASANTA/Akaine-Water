import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";


import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import BlogDetailsHead from "./Component/BlogDetailsHead/BlogDetailsHead";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";

function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/plan" element={<PricingAndPlans />} />
        <Route path="/blogdetails" element={<BlogDetails/>}/>
      </Routes>

  <Footer/>
    </BrowserRouter>
  );
}

export default App;