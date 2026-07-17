import React, { useState } from "react";
import "./WdmsSecond.css";

import {
  FiPackage,
  FiAlertTriangle,
  FiTrendingUp,
  FiTruck,
  FiEye,
  FiChevronRight,
  FiX,
  FiSearch,
  FiFilter,
  FiCalendar,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 20 },
  { day: "Tue", sales: 38 },
  { day: "Wed", sales: 30 },
  { day: "Thu", sales: 52 },
  { day: "Fri", sales: 46 },
  { day: "Sat", sales: 58 },
  { day: "Sun", sales: 70 },
];

const recentOrders = [
  {
    id: "#ORD1001",
    customer: "Rahul Kumar",
    delivery: "Amit Das",
    amount: "₹180",
    status: "Delivered",
    time: "11:30 AM",
  },
  {
    id: "#ORD1002",
    customer: "Anil Sharma",
    delivery: "Puja Sahoo",
    amount: "₹220",
    status: "Pending",
    time: "10:15 AM",
  },
  {
    id: "#ORD1003",
    customer: "Rajesh Patra",
    delivery: "Rakesh Nayak",
    amount: "₹150",
    status: "Delivered",
    time: "09:30 AM",
  },
  {
    id: "#ORD1004",
    customer: "Priya Mohanty",
    delivery: "Sunil Behera",
    amount: "₹300",
    status: "Processing",
    time: "08:45 AM",
  },
  {
    id: "#ORD1005",
    customer: "Sneha Reddy",
    delivery: "Vikram Singh",
    amount: "₹450",
    status: "Delivered",
    time: "07:30 AM",
  },
  {
    id: "#ORD1006",
    customer: "Arjun Mehta",
    delivery: "Rohit Sharma",
    amount: "₹275",
    status: "Pending",
    time: "06:45 AM",
  },
];

const lowStocks = [
  {
    id: 1,
    name: "20L Water Bottle",
    stock: 300,
    threshold: 500,
    status: "Critical",
  },
  {
    id: 2,
    name: "10L Water Bottle",
    stock: 150,
    threshold: 300,
    status: "Warning",
  },
  {
    id: 3,
    name: "5L Water Bottle",
    stock: 80,
    threshold: 200,
    status: "Critical",
  },
  {
    id: 4,
    name: "2L Water Bottle",
    stock: 45,
    threshold: 100,
    status: "Critical",
  },
  {
    id: 5,
    name: "1L Water Bottle",
    stock: 120,
    threshold: 150,
    status: "Warning",
  },
  {
    id: 6,
    name: "500ml Water Bottle",
    stock: 30,
    threshold: 80,
    status: "Critical",
  },
];

const WdmsSecond = () => {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAllLowStock, setShowAllLowStock] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const getDisplayOrders = () => {
    let orders = showAllOrders ? recentOrders : recentOrders.slice(0, 4);
    
    // Apply search filter
    if (searchTerm) {
      orders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.delivery.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      orders = orders.filter(order => 
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    return orders;
  };

  const getDisplayLowStock = () => {
    return showAllLowStock ? lowStocks : lowStocks.slice(0, 3);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return "✅";
      case "Pending":
        return "⏳";
      case "Processing":
        return "🔄";
      default:
        return "📦";
    }
  };

  const getStockStatusColor = (status) => {
    return status === "Critical" ? "#ef4444" : "#f59e0b";
  };

  const getStockStatusBg = (status) => {
    return status === "Critical" ? "#fee2e2" : "#fef3c7";
  };

  return (
    <div className="wdmsDashboard">
      {/* TOP SECTION */}
      <div className="wdmsTopSection">
        {/* STOCK OVERVIEW */}
        <div className="wdmsCard wdmsStockOverview">
          <div className="wdmsCardHeader">
            <h3>Stock Overview</h3>
            <div className="wdmsHeaderActions">
              <button className="viewAllBtn" onClick={() => setShowAllLowStock(!showAllLowStock)}>
                <FiEye />
                {showAllLowStock ? "Show Less" : "View All"}
                <FiChevronRight className={`chevron ${showAllLowStock ? "rotate" : ""}`} />
              </button>
            </div>
          </div>

          <div className="wdmsStockGrid">
            <div className="wdmsStockCard">
              <div className="wdmsStockIcon stockBlue">
                <FiPackage />
              </div>
              <h2>1,245</h2>
              <p>Fresh Stock</p>
              <span>12 Bottles Added Today</span>
            </div>

            <div className="wdmsStockCard">
              <div className="wdmsStockIcon stockGreen">
                <FiTrendingUp />
              </div>
              <h2>872</h2>
              <p>Empty Bottles</p>
              <span>Returned Inventory</span>
            </div>

            <div className="wdmsStockCard">
              <div className="wdmsStockIcon stockOrange">
                <FiAlertTriangle />
              </div>
              <h2>24</h2>
              <p>Damaged Stock</p>
              <span>Need Verification</span>
            </div>

            <div className="wdmsStockCard">
              <div className="wdmsStockIcon stockRed">
                <FiTruck />
              </div>
              <h2>8</h2>
              <p>Low Stock Items</p>
              <span>Urgent Restocking</span>
            </div>
          </div>
        </div>

        {/* SALES OVERVIEW */}
        <div className="wdmsCard wdmsSalesOverview">
          <div className="wdmsCardHeader">
            <h3>Sales Overview</h3>
            <span className="weekBadge">This Week</span>
          </div>

          <div className="wdmsChartContainer">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={4}
                  dot={{ fill: "#2563eb", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="wdmsAlertSection">
            <div className="wdmsAlertHeader">
              <h4>Low Stock Alerts</h4>
              <button 
                className="viewAllBtn"
                onClick={() => setShowAllLowStock(!showAllLowStock)}
              >
                <FiEye />
                {showAllLowStock ? "Show Less" : "View All"}
              </button>
            </div>

            <div className="wdmsAlertGrid">
              {getDisplayLowStock().map((item) => (
                <div 
                  className="wdmsAlertCard" 
                  key={item.id}
                  style={{
                    borderColor: getStockStatusColor(item.status),
                  }}
                >
                  <div className="alertCardHeader">
                    <h5>{item.name}</h5>
                    <span 
                      className="stockStatus"
                      style={{
                        background: getStockStatusBg(item.status),
                        color: getStockStatusColor(item.status),
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h2 style={{ color: getStockStatusColor(item.status) }}>
                    {item.stock}
                  </h2>
                  <span>Left In Stock</span>
                  <div className="stockProgress">
                    <div 
                      className="stockProgressBar"
                      style={{
                        width: `${(item.stock / item.threshold) * 100}%`,
                        background: getStockStatusColor(item.status),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="wdmsCard wdmsRecentOrderSection">
        <div className="wdmsCardHeader">
          <h3>Recent Orders</h3>
          <div className="wdmsHeaderActions">
            <button 
              className="viewAllBtn"
              onClick={() => setShowAllOrders(!showAllOrders)}
            >
              <FiEye />
              {showAllOrders ? "Show Less" : "View All Orders"}
              <FiChevronRight className={`chevron ${showAllOrders ? "rotate" : ""}`} />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="orderControls">
          <div className="orderSearchWrapper">
            <FiSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="orderSearchInput"
            />
            {searchTerm && (
              <button className="clearSearch" onClick={() => setSearchTerm("")}>
                <FiX />
              </button>
            )}
          </div>
          <div className="orderFilterWrapper">
            <button 
              className={`filterBtn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              Filter
            </button>
            {showFilters && (
              <div className="filterDropdown">
                <button 
                  className={statusFilter === "all" ? "active" : ""}
                  onClick={() => setStatusFilter("all")}
                >
                  All Orders
                </button>
                <button 
                  className={statusFilter === "delivered" ? "active" : ""}
                  onClick={() => setStatusFilter("delivered")}
                >
                  Delivered
                </button>
                <button 
                  className={statusFilter === "pending" ? "active" : ""}
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </button>
                <button 
                  className={statusFilter === "processing" ? "active" : ""}
                  onClick={() => setStatusFilter("processing")}
                >
                  Processing
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="wdmsTableWrapper">
          <table className="wdmsOrderTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Delivery Boy</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getDisplayOrders().length > 0 ? (
                getDisplayOrders().map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="orderId">{order.id}</span>
                    </td>
                    <td>
                      <div className="customerInfo">
                        <span className="customerName">{order.customer}</span>
                      </div>
                    </td>
                    <td>{order.delivery}</td>
                    <td>
                      <span className="orderAmount">{order.amount}</span>
                    </td>
                    <td>
                      <span
                        className={`wdmsStatus ${
                          order.status === "Delivered"
                            ? "statusDelivered"
                            : order.status === "Pending"
                            ? "statusPending"
                            : "statusProcessing"
                        }`}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                    <td>
                      <span className="orderTime">{order.time}</span>
                    </td>
                    <td>
                      <button 
                        className="viewOrderBtn"
                        onClick={() => handleViewOrder(order)}
                      >
                        <FiEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="noOrders">
                    <div className="noOrdersContent">
                      <FiPackage className="noOrdersIcon" />
                      <p>No orders found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!showAllOrders && recentOrders.length > 4 && (
          <div className="showMoreWrapper">
            <button 
              className="showMoreBtn"
              onClick={() => setShowAllOrders(true)}
            >
              Show More Orders
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="orderModalOverlay" onClick={closeOrderDetails}>
          <div className="orderModal" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={closeOrderDetails}>
              <FiX />
            </button>
            <div className="modalHeader">
              <h3>Order Details</h3>
              <span className={`modalStatus ${selectedOrder.status === "Delivered" ? "statusDelivered" : selectedOrder.status === "Pending" ? "statusPending" : "statusProcessing"}`}>
                {selectedOrder.status}
              </span>
            </div>
            <div className="modalBody">
              <div className="modalRow">
                <span className="modalLabel">Order ID</span>
                <span className="modalValue">{selectedOrder.id}</span>
              </div>
              <div className="modalRow">
                <span className="modalLabel">Customer</span>
                <span className="modalValue">{selectedOrder.customer}</span>
              </div>
              <div className="modalRow">
                <span className="modalLabel">Delivery Boy</span>
                <span className="modalValue">{selectedOrder.delivery}</span>
              </div>
              <div className="modalRow">
                <span className="modalLabel">Amount</span>
                <span className="modalValue highlight">{selectedOrder.amount}</span>
              </div>
              <div className="modalRow">
                <span className="modalLabel">Time</span>
                <span className="modalValue">{selectedOrder.time}</span>
              </div>
            </div>
            <div className="modalFooter">
              <button className="modalActionBtn" onClick={closeOrderDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WdmsSecond;