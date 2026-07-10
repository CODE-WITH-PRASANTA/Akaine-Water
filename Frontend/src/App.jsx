import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";


function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
      


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App
