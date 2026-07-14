import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers/Customers";
import MainLayout from "./Layout/MainLayout/MainLayout";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";



// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
         <Route path="/wdms/customers" element={<Customers />} />
      <Route path="/wdms/vehicle-stock" element={<VehicleStock />} />
      <Route path="/wdms/payments" element={<Payment />} />
      <Route path="/wdms/reports" element={<Reports />} />
      <Route path="/wdms/orders" element={<Orders />} />
          
        </Route>

             
      </Routes>
    </BrowserRouter>
  );
};

export default App;