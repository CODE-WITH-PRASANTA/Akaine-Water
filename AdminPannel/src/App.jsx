import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Components / Pages
import Login from "./Components/Login/Login"; // Import your Login Component
 // Import your ProtectedRoute wrapper

import OurTeam from "./Components/OurTeam/OurTeam";
import Gallery from "./Components/Gallery/Gallery";
import Testimonial from "./pages/Testimonial/Testimonial";
import Testiminial from "./Components/Testiminial/Testiminial";
import ShopPosting from "./Components/ShopPosting/ShopPosting";
import Contact from "./Components/Contact/Contact";
import Dashboards from "./Pages/Dashboards/Dashboards";
import Blog from "./Components/Blog/Blog";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

import DashboardMain from "./Pages/DashboardMain/DashboardMain";
// import ManageStock from "./Components/ManageStock/ManageStock";
import Paymentmanagement from "./Components/Paymentmanagement/Paymentmanagement";
import ProductandPrice from "./Components/ProductandPrice/ProductandPrice";
import InvoiceManagement from "./Components/InvoiceManagement/InvoiceManagement";
import DeliveryBoyassign from "./Components/DeliveryBoyassign/DeliveryBoyassign";
import DamagedStock from "./Components/DamagedStock/DamagedStock";

import Expense from "./Components/Expense/Expense";
import ReportsAnalytics from "./Components/ReportsAnalytics/ReportsAnalytics";
import Orders from "./Pages/Orders/Orders";
import CustomerManage from "./Pages/CustomerManage/CustomerManage";
import RouteManagement from "./Pages/RouteManagement/RouteManagement";
import Inventory from "./Pages/Inventory/Inventory";
import Vehicles from "./Components/Vehicles/Vehicles";

import AddExpense from "./Components/AddExpense/AddExpense";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
<<<<<<< HEAD
import SubscriptionManagement from "./Pages/SubscriptionManagement/SubscriptionManagement";
import DeliveryId from "./Pages/DeliveryId/DeliveryId";
=======
import ManageStock from "./Components/ManageStock/ManageStock";

>>>>>>> f6076958211f0ad7c407d1250f8806b23c81701f

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes Block */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Redirect root URL "/" straight to the dashboard or home if logged in */}
            <Route path="/" element={<Navigate to="/wdms/dashboard" replace />} />
            
            {/* Private Admin & Site Pages */}
            <Route path="wdms/expenses" element={<Expense />} />
            <Route path="wdms/reports" element={<ReportsAnalytics />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/shop" element={<ShopPosting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/blog" element={<Blog />} />

            {/* Blog Posting */}
            <Route path="/blog-posting" element={<BlogPosting />} />

            {/* Blog Management */}
            <Route path="/blog-management" element={<BlogManagement />} />

            {/* Additional Pages */}
            <Route path="/resources/team" element={<OurTeam />} />
            <Route path="/resources/gallary" element={<Gallery />} />
            <Route path="/products/testimonials" element={<Testiminial />} />
            <Route path="/wdms/orders" element={<Orders />} />
            <Route path="/wdms/customer" element={<CustomerManage />} />
            <Route path="/wdms/route-management" element={<RouteManagement />} />
            <Route path="/wdms/inventory" element={<Inventory />} />
            <Route path="/wdms/add-expenses" element={<AddExpense />} />

            <Route path="/wdms/dashboard" element={<DashboardMain />} />
            <Route path="/wdms/payments" element={<Paymentmanagement />} />
            <Route path="/wdms/products-pricing" element={<ProductandPrice />} />
            <Route path="/wdms/assign-delivery" element={<DeliveryBoyassign />} />
            <Route path="/wdms/damage-stock" element={<DamagedStock />} />
            <Route path="wdms/vehicles" element={<Vehicles />} />
            <Route path="wdms/stock/purchase-history" element={<StockManagement/>}/>
            <Route path="/resources/gallery" element={<Gallery />} />
            <Route path="/wdms/invoice" element={<InvoiceManagement />} />
<<<<<<< HEAD
            <Route path="/products/subscription" element={<SubscriptionManagement/>} />
            <Route path="/products/id-generate" element={<DeliveryId/>} />
=======
           <Route path="/wdms/stock/manage" element={<ManageStock/>}/>
>>>>>>> f6076958211f0ad7c407d1250f8806b23c81701f
          </Route>
        </Route>

        {/* Fallback Route: Redirects all unhandled URLs to Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;