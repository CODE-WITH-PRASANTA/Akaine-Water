import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import MainDashboard from "./Pages/MainDashboard/MainDashboard";
import MyOrder from "./Components/MyOrder/MyOrder";
import SupportTickets from "./Components/SupportTickets/SupportTickets";
import MySubscription from "./Components/MySubscription/MySubscription";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/login" element={<Login/>} />
         <Route element={<ProtectedRoute/>}>

        <Route path="/" element={<MainLayout />}>
          {/* Default page */}
          <Route index element={<MainDashboard />} />

          {/* Other pages */}
          <Route path="orders" element={<MyOrder />} />
          <Route path="support" element={<SupportTickets />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/subscription" element={<MySubscription />} />
         
         </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;