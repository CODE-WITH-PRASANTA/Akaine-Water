import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPage from "./Pages/OrderPage/OrderPage";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/orderpage" element={<OrderPage/>}/>
 
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;