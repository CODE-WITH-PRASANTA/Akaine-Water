import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDashboard from "./Pages/MainDashboard/MainDashboard";


// Layout
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<MainDashboard/>} />

        <Route path="/" element={<MainLayout />}>
          {/* Default page */}
          <Route index element={<Navigate to="orders" replace />} />

          {/* Pages inside layout */}
          <Route path="orders" element={<MyOrder />} />
          <Route path="support" element={<SupportTickets />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;