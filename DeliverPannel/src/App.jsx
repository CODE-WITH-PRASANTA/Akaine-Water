import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components & Pages
import Dashboard from "./Component/Dashboard/Dashboard";
import MainLayout from "./Layout/MainLayout/MainLayout";
import FailedDelivery from "./Component/FailedDelivery/FailedDelivery";
import Customers from "./Pages/Customers/Customers";
import VehicleStock from "./Pages/VehicleStock/VehicleStock";
import Payment from "./Pages/Payment/Payment";
import Reports from "./Component/Reports/Reports";
import Orders from "./Component/Orders/Orders";
import EmptyReturn from "./Component/EmptyReturn/EmptyReturn";
import RoutePlanner from "./Component/RoutePlanner/RoutePlanner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes wrapped in MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="failed" element={<FailedDelivery />} />
          
          {/* WDMS Routes */}
          <Route path="wdms/empty-return" element={<EmptyReturn />} />
          <Route path="wdms/customers" element={<Customers />} />
          <Route path="wdms/vehicle-stock" element={<VehicleStock />} />
          <Route path="wdms/payments" element={<Payment />} />
          <Route path="wdms/reports" element={<Reports />} />
          <Route path="wdms/orders" element={<Orders />} />
          <Route path="wdms/route-planner" element={<RoutePlanner />} />

          {/* Alternative path requested */}
          <Route path="emptyreturn" element={<EmptyReturn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;