import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<Shop/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;