import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";



// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
        <Route path="/emptyreturn"  element={<EmptyReturn/>}/>
        </Route>

             
      </Routes>
    </BrowserRouter>
  );
};

export default App;