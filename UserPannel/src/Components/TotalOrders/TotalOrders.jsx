import React from 'react';
import './TotalOrders.css';

const TotalOrders = () => {
  const cardsData = [
    {
      id: 1,
      title: 'Orders',
      value: '75',
      percentage: '10%',
      type: 'blue',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Total Sales',
      value: '$ 1,024.75',
      percentage: '20%',
      type: 'green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Products Sold',
      value: '210',
      percentage: '15%',
      type: 'orange',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'New Users',
      value: '30',
      percentage: '5%',
      type: 'purple',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <div className="total-orders-wrapper">
      <div className="total-orders-grid">
        {cardsData.map((card) => (
          <div key={card.id} className="total-orders-card">
            <div className="total-orders-card-top">
              <div className={`total-orders-icon-box ${card.type}`}>
                {card.icon}
              </div>
              <div className="total-orders-info">
                <span className="total-orders-title">{card.title}</span>
                <h3 className="total-orders-value">{card.value}</h3>
              </div>
            </div>
            <div className="total-orders-card-bottom">
              <span className={`total-orders-trend ${card.type}`}>
                <svg className="total-orders-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                {card.percentage}
              </span>
              <span className="total-orders-subtext">vs last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalOrders;