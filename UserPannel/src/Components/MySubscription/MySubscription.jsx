import React, { useState } from "react";
import "./MySubscription.css";
import { 
  FiSearch, 
  FiBell, 
  FiChevronDown, 
  FiPlus, 
  FiShoppingCart, 
  FiCalendar, 
  FiRefreshCw, 
  FiDollarSign, 
  FiMapPin, 
  FiHeadphones, 
  FiMoreVertical,
  FiCheckCircle,
  FiBox,
  FiX
} from "react-icons/fi";

import waterBottleImg from "../../assets/bt1.jpg"; // Update your asset path if needed
import userAvatar from "../../assets/user1.jpg"; // Update your asset path if needed

const MySubscription = () => {
  const [activeSub, setActiveSub] = useState({
    title: "Alka Drops Monthly Plan - Premium",
    status: "Active",
    nextDelivery: "Oct 15, 2023",
    schedule: "Every 15 days",
    items: "5x 20L Water Jar",
    price: "$45.00 per delivery"
  });

  const [subscriptionsList, setSubscriptionsList] = useState([
    {
      id: 1,
      name: "Monthly Plan - Premium",
      started: "Sep 15, 2023",
      items: "5x 20L Water Jar",
      schedule: "Every 15 days",
      nextDelivery: "Oct 15, 2023",
      amount: "$45.00",
      status: "Active"
    },
    {
      id: 2,
      name: "Weekly Plan - Standard",
      started: "Aug 20, 2023",
      items: "3x 20L Water Jar",
      schedule: "Every 7 days",
      nextDelivery: "Oct 8, 2023",
      amount: "$28.00",
      status: "Paused"
    },
    {
      id: 3,
      name: "Monthly Plan - Basic",
      started: "Jul 10, 2023",
      items: "2x 20L Water Jar",
      schedule: "Every 30 days",
      nextDelivery: "-",
      amount: "$20.00",
      status: "Cancelled"
    },
    {
      id: 4,
      name: "Bi-Weekly Plan - Pro",
      started: "Jun 01, 2023",
      items: "4x 20L Water Jar",
      schedule: "Every 14 days",
      nextDelivery: "-",
      amount: "$36.00",
      status: "Inactive"
    },
    {
      id: 5,
      name: "Custom Corporate Plan",
      started: "May 10, 2023",
      items: "10x 20L Water Jar",
      schedule: "Every 5 days",
      nextDelivery: "Nov 01, 2023",
      amount: "$85.00",
      status: "Active"
    }
  ]);

  // Track which row's 3-dot menu is currently open
  const [openMenuId, setOpenMenuId] = useState(null);

  // New Subscription Modal State
  const [showNewSubModal, setShowNewSubModal] = useState(false);
  const [newSubForm, setNewSubForm] = useState({
    planType: "Monthly Plan - Premium ($45.00)",
    items: "5x 20L Water Jar",
    schedule: "Every 15 days",
    firstDeliveryDate: "Oct 15, 2023",
    deliveryAddress: "123 Main Street, Apt 4B, Cityville, State, Zip Code"
  });

  const [recentOrders] = useState([
    { id: "#AD1023", date: "Oct 5, 2023", items: "5x 20L Water Jar", total: "$45.00", status: "Delivered" },
    { id: "#AD1022", date: "Sep 20, 2023", items: "3x 20L Water Jar", total: "$28.00", status: "Delivered" },
    { id: "#AD1021", date: "Sep 5, 2023", items: "2x 20L Water Jar", total: "$20.00", status: "Pending" },
    { id: "#AD1020", date: "Aug 20, 2023", items: "3x 20L Water Jar", total: "$28.00", status: "Delivered" },
    { id: "#AD1019", date: "Aug 5, 2023", items: "5x 20L Water Jar", total: "$45.00", status: "Delivered" },
  ]);

  const handleManageSub = () => {
    alert("Opening Subscription Management settings...");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewSubForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewSubscription = (e) => {
    e.preventDefault();
    
    // Extract plan name and price cleanly
    const planParts = newSubForm.planType.split("(");
    const planName = planParts[0].trim();
    const planAmount = planParts[1] ? "$" + planParts[1].replace(")", "").replace("$", "") : "$45.00";

    const newEntry = {
      id: subscriptionsList.length + 1,
      name: planName,
      started: "Oct 15, 2023",
      items: newSubForm.items,
      schedule: newSubForm.schedule,
      nextDelivery: newSubForm.firstDeliveryDate,
      amount: planAmount,
      status: "Active"
    };

    setSubscriptionsList([newEntry, ...subscriptionsList]);
    setShowNewSubModal(false);
    alert("New subscription successfully created and activated!");
  };

  const handleQuickAction = (actionName) => {
    alert(`Executing action: ${actionName}`);
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleStatusChange = (id, newStatus) => {
    setSubscriptionsList(prevList =>
      prevList.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
    );
    setOpenMenuId(null);
  };

  return (
    <div className="MySubscription" onClick={() => setOpenMenuId(null)}>
      {/* Top Navigation Bar */}
      <header className="MySubscription__topbar">
        <div className="MySubscription__searchWrapper">
          <FiSearch className="MySubscription__searchIcon" />
          <input 
            type="text" 
            placeholder="Search for orders, subscriptions..." 
            className="MySubscription__searchInput"
          />
        </div>
        <div className="MySubscription__userProfile">
          <div className="MySubscription__notificationIcon">
            <FiBell />
            <span className="MySubscription__badge">3</span>
          </div>
          <div className="MySubscription__profileInfo">
            <img src={userAvatar} alt="Sarah Johnson" className="MySubscription__avatar" />
            <span className="MySubscription__userName">Sarah Johnson</span>
            <FiChevronDown className="MySubscription__dropdownIcon" />
          </div>
        </div>
      </header>

      {/* Main Title Section */}
      <div className="MySubscription__headerSection">
        <div>
          <h1>My Subscriptions</h1>
          <p>View and manage your water delivery subscriptions</p>
        </div>
        <button className="MySubscription__newSubBtn" onClick={() => setShowNewSubModal(true)}>
          <FiPlus /> New Subscription
        </button>
      </div>

      {/* Grid Section: Active Subscription & Recent Orders */}
      <div className="MySubscription__mainGrid">
        {/* Active Subscription Card */}
        <div className="MySubscription__card MySubscription__activeSubCard">
          <h2>Active Subscription</h2>
          <div className="MySubscription__activeContent">
            <div className="MySubscription__bottleImgBox">
              <img src={waterBottleImg} alt="Water Bottle Container" />
            </div>
            <div className="MySubscription__activeDetails">
              <div className="MySubscription__titleRow">
                <h3>{activeSub.title}</h3>
                <span className="MySubscription__statusBadge active">{activeSub.status}</span>
              </div>
              <ul>
                <li><FiCalendar /> Next delivery: <strong>{activeSub.nextDelivery}</strong></li>
                <li><FiRefreshCw /> Delivery Schedule: <strong>{activeSub.schedule}</strong></li>
                <li><FiBox /> Items: <strong>{activeSub.items}</strong></li>
                <li><FiDollarSign /> Price: <strong>{activeSub.price}</strong></li>
              </ul>
              <button className="MySubscription__manageBtn" onClick={handleManageSub}>
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="MySubscription__card MySubscription__recentOrdersCard">
          <div className="MySubscription__cardHeader">
            <h2>Recent Orders</h2>
            <button className="MySubscription__viewAllBtn" onClick={() => alert("Viewing all orders")}>View All Orders</button>
          </div>
          <div className="MySubscription__tableWrapper">
            <table className="MySubscription__table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="highlight-id">{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`status-pill ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="MySubscription__quickActionsContainer">
        <h2>Quick Actions</h2>
        <div className="MySubscription__actionsGrid">
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Order Again")}>
            <div className="action-icon"><FiShoppingCart /></div>
            <h4>Order Again</h4>
            <p>Place a new order</p>
          </div>
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Schedule Delivery")}>
            <div className="action-icon"><FiCalendar /></div>
            <h4>Schedule Delivery</h4>
            <p>Choose delivery date</p>
          </div>
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Change Plan")}>
            <div className="action-icon"><FiRefreshCw /></div>
            <h4>Change Plan</h4>
            <p>Upgrade or downgrade</p>
          </div>
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Payment History")}>
            <div className="action-icon"><FiDollarSign /></div>
            <h4>Payment History</h4>
            <p>View all payments</p>
          </div>
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Manage Address")}>
            <div className="action-icon"><FiMapPin /></div>
            <h4>Manage Address</h4>
            <p>Update delivery address</p>
          </div>
          <div className="MySubscription__actionCard" onClick={() => handleQuickAction("Contact Support")}>
            <div className="action-icon"><FiHeadphones /></div>
            <h4>Contact Support</h4>
            <p>Get help from team</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: All Subscriptions & Subscription Benefits */}
      <div className="MySubscription__bottomGrid">
        {/* All Subscriptions Table */}
        <div className="MySubscription__card MySubscription__allSubsCard">
          <h2>All Subscriptions</h2>
          <div className="MySubscription__tableWrapper">
            <table className="MySubscription__table">
              <thead>
                <tr>
                  <th>Plan Details</th>
                  <th>Items</th>
                  <th>Delivery Schedule</th>
                  <th>Next Delivery</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionsList.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div className="sub-plan-info">
                        <img src={waterBottleImg} alt="bottle thumbnail" className="table-thumb" />
                        <div>
                          <strong>{sub.name}</strong>
                          <span className="started-date">Started: {sub.started}</span>
                        </div>
                      </div>
                    </td>
                    <td>{sub.items}</td>
                    <td>{sub.schedule}</td>
                    <td>{sub.nextDelivery}</td>
                    <td>
                      <strong>{sub.amount}</strong>
                      <span className="sub-text">per delivery</span>
                    </td>
                    <td>
                      <span className={`status-pill ${sub.status.toLowerCase()}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="action-menu-cell" style={{ position: "relative" }}>
                      <button className="MySubscription__moreBtn" onClick={(e) => toggleMenu(sub.id, e)}>
                        <FiMoreVertical />
                      </button>
                      
                      {openMenuId === sub.id && (
                        <div className="MySubscription__actionDropdown">
                          <p className="dropdown-header">Change Status</p>
                          <button onClick={() => handleStatusChange(sub.id, "Active")}>Active</button>
                          <button onClick={() => handleStatusChange(sub.id, "Paused")}>Paused</button>
                          <button onClick={() => handleStatusChange(sub.id, "Inactive")}>Inactive</button>
                          <button onClick={() => handleStatusChange(sub.id, "Cancelled")}>Cancelled</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription Benefits Panel without Image */}
        <div className="MySubscription__card MySubscription__benefitsCard" style={{ padding: "16px 20px" }}>
          <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>Subscription Benefits</h2>
          <ul className="MySubscription__benefitList" style={{ margin: 0, paddingLeft: "16px" }}>
            <li style={{ marginBottom: "6px", fontSize: "13px" }}><FiCheckCircle className="benefit-icon" /> Free delivery on all orders</li>
            <li style={{ marginBottom: "6px", fontSize: "13px" }}><FiCheckCircle className="benefit-icon" /> Flexible delivery schedules</li>
            <li style={{ marginBottom: "6px", fontSize: "13px" }}><FiCheckCircle className="benefit-icon" /> Easy plan changes</li>
            <li style={{ marginBottom: "6px", fontSize: "13px" }}><FiCheckCircle className="benefit-icon" /> 24/7 customer support</li>
            <li style={{ marginBottom: "0", fontSize: "13px" }}><FiCheckCircle className="benefit-icon" /> No cancellation fees</li>
          </ul>
        </div>
      </div>

      {/* Create New Subscription Modal Popup */}
      {showNewSubModal && (
        <div className="MySubscription__modalOverlay" style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center",
          alignItems: "center", zIndex: 1000
        }}>
          <div className="MySubscription__ModalContent" style={{
            background: "#fff", padding: "24px", borderRadius: "12px", width: "100%",
            maxWidth: "500px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>Create New Subscription</h2>
              <button 
                onClick={() => setShowNewSubModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#666" }}
              >
                <FiX />
              </button>
            </div>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
              Fill in the details below to set up a new water delivery plan.
            </p>

            <form onSubmit={handleSaveNewSubscription}>
              {/* Select Plan Type Dropdown */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Select Plan Type</label>
                <select 
                  name="planType"
                  value={newSubForm.planType}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", background: "#fff" }}
                >
                  <option value="Monthly Plan - Premium ($45.00)">Monthly Plan - Premium ($45.00)</option>
                  <option value="Weekly Plan - Standard ($28.00)">Weekly Plan - Standard ($28.00)</option>
                  <option value="Monthly Plan - Basic ($20.00)">Monthly Plan - Basic ($20.00)</option>
                  <option value="Bi-Weekly Plan - Pro ($36.00)">Bi-Weekly Plan - Pro ($36.00)</option>
                  <option value="Custom Corporate Plan ($85.00)">Custom Corporate Plan ($85.00)</option>
                </select>
              </div>

              {/* Items / Quantity Dropdown */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Items / Quantity</label>
                <select 
                  name="items"
                  value={newSubForm.items}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", background: "#fff" }}
                >
                  <option value="2x 20L Water Jar">2x 20L Water Jar</option>
                  <option value="3x 20L Water Jar">3x 20L Water Jar</option>
                  <option value="4x 20L Water Jar">4x 20L Water Jar</option>
                  <option value="5x 20L Water Jar">5x 20L Water Jar</option>
                  <option value="10x 20L Water Jar">10x 20L Water Jar</option>
                </select>
              </div>

              {/* Delivery Schedule Dropdown */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Delivery Schedule</label>
                <select 
                  name="schedule"
                  value={newSubForm.schedule}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", background: "#fff" }}
                >
                  <option value="Every 5 days">Every 5 days</option>
                  <option value="Every 7 days">Every 7 days</option>
                  <option value="Every 14 days">Every 14 days</option>
                  <option value="Every 15 days">Every 15 days</option>
                  <option value="Every 30 days">Every 30 days</option>
                </select>
              </div>

              {/* First Delivery Date Input */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>First Delivery Date</label>
                <input 
                  type="text" 
                  name="firstDeliveryDate"
                  value={newSubForm.firstDeliveryDate}
                  onChange={handleFormChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              {/* Delivery Address Textarea */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Delivery Address</label>
                <textarea 
                  name="deliveryAddress"
                  value={newSubForm.deliveryAddress}
                  onChange={handleFormChange}
                  rows="3"
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              {/* Modal Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  onClick={() => setShowNewSubModal(false)}
                  style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontWeight: "600", flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: "10px 20px", borderRadius: "6px", border: "none", background: "#0b5ed7", color: "#fff", cursor: "pointer", fontWeight: "600", flex: 1 }}
                >
                  Save & Activate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscription;