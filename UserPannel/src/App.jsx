import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyOrder from "./Components/MyOrder/MyOrder";


// Layout


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/myorder" element={<MyOrder/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;