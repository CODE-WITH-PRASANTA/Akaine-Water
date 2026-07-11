import { BrowserRouter, Routes, Route } from "react-router-dom";
import Testimonial from "./pages/Testimonial/Testimonial";
import TestiminialBreadcrum from "./Components/TestiminialBreadcrum/TestiminialBreadcrum";
import Reviewblue from "./Components/Reviewblue/Reviewblue";
import Reviewwhite from "./Components/Reviewwhite/Reviewwhite";
import Faq from "./pages/Faq/Faq";
import Faqbreadcurm from "./Components/Faqbreadcurm/Faqbreadcurm";
import Informationpricing from "./Components/Informationpricing/Informationpricing";
import Cart from "./pages/Cart/Cart";
import Cartbreadcurm from "./Components/Cartbreadcurm/Cartbreadcurm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testimonial" element={<Testimonial/>}/>
        <Route path="/testimonialbreadcurm" element={<TestiminialBreadcrum/>}/>
        <Route path="/reviewblue" element={<Reviewblue/>}/>
        <Route path="/reviewwhite" element={<Reviewwhite/>}/>
        <Route path="/Faq" element={<Faq/>}/>
        <Route path="/Faqbreadcurm" element={<Faqbreadcurm/>}/>
        <Route path="/informationpricing" element={<Informationpricing/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/cartbreadcurm" element={<Cartbreadcurm/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;