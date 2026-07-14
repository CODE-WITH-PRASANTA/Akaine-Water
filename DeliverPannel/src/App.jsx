import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./Pages/Customers/Customers";
import MainLayout from "./Layout/MainLayout/MainLayout";
<<<<<<< HEAD
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";
=======
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";
>>>>>>> 8c7a36e72fb60836eda90dcdf8966e298c1ae614



// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
         <Route path="/wdms/customers" element={<Customers />} />
      <Route path="/wdms/vehicle-stock" element={<VehicleStock />} />
      <Route path="/wdms/payments" element={<Payment />} />
      <Route path="/wdms/reports" element={<Reports />} />
      <Route path="/wdms/orders" element={<Orders />} />
          
=======
        <Route path="/emptyreturn"  element={<EmptyReturn/>}/>

         <Route path="/wdms/route-planner" element={<RoutePlanner />} />

>>>>>>> 8c7a36e72fb60836eda90dcdf8966e298c1ae614
        </Route>

             
      </Routes>
    </BrowserRouter>
  );
};

export default App;