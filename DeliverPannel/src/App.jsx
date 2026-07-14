import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers/Customers";
import MainLayout from "./Layout/MainLayout/MainLayout";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";



// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
        <Route path="/wdms/empty-return"  element={<EmptyReturn/>}/>
=======
         <Route path="/wdms/customers" element={<Customers />} />
      <Route path="/wdms/vehicle-stock" element={<VehicleStock />} />
      <Route path="/wdms/payments" element={<Payment />} />
      <Route path="/wdms/reports" element={<Reports />} />
      <Route path="/wdms/orders" element={<Orders />} />
          
        <Route path="/emptyreturn"  element={<EmptyReturn/>}/>
>>>>>>> 8f0e09c88b66a240447443e0cd1ccaf43857289c

         <Route path="/wdms/route-planner" element={<RoutePlanner />} />

        </Route>

             
      </Routes>
    </BrowserRouter>
  );
};

export default App;