import React from "react";
import {
  ShoppingBag,
  CalendarDays,
  ClipboardList,
  Wallet,
} from "lucide-react";
import "./TotalOrders.css";

const cardData = [
  {
    id: 1,
    title: "Total Orders",
    value: "24",
    subtitle: "Completed Orders",
    icon: <ShoppingBag size={34} />,
    cardClass: "to-card-blue",
    iconClass: "to-icon-blue",
  },
  {
    id: 2,
    title: "Upcoming Delivery",
    value: "Oct 15, 2023",
    subtitle: "Between 9 AM - 11 AM",
    icon: <CalendarDays size={34} />,
    cardClass: "to-card-green",
    iconClass: "to-icon-green",
  },
  {
    id: 3,
    title: "Active Subscription",
    value: "Premium Plan",
    subtitle: "Next billing: Nov 15, 2023",
    icon: <ClipboardList size={34} />,
    cardClass: "to-card-orange",
    iconClass: "to-icon-orange",
  },
  {
    id: 4,
    title: "Wallet Balance",
    value: "$15.50",
    subtitle: "Available Balance",
    icon: <Wallet size={34} />,
    cardClass: "to-card-purple",
    iconClass: "to-icon-purple",
  },
];

const TotalOrders = () => {
  return (
    <div className="to-dashboard">
      <div className="to-dashboard-header">
        <div>
          <h2 className="to-dashboard-title">Dashboard Overview</h2>
          <p className="to-dashboard-subtitle">
            Welcome back! Here's a quick summary of your account.
          </p>
        </div>
      </div>

      <div className="to-card-grid">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`to-dashboard-card ${card.cardClass}`}
          >
            <div className={`to-card-icon ${card.iconClass}`}>
              {card.icon}
            </div>

            <div className="to-card-content">
              <h5 className="to-card-title">{card.title}</h5>

              <h2 className="to-card-value">{card.value}</h2>

              <p className="to-card-subtitle">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalOrders;