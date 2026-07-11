import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";

import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";
import "./App.css";


import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import OurTeam from "./Component/OurTeam/OurTeam";

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
          <Route path='/galary' element={<AkaineGalary/>}/>
          <Route path='/ourteam' element={<OurTeam/>}/>
      </Routes>
    <Topbar/>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/plan" element={<PricingAndPlans />} />
      </Routes>

  <Footer/>
    </BrowserRouter>
  );
}

export default App;