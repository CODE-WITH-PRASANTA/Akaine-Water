import React, { useState } from 'react';
import './Paymentmanagement.css'; 

const Paymentmanagement = () => {
  const paymentStats = {
    today: 48650,
    cash: 25450,
    upi: 18650,
    due: 12850
  };

  const paymentMethods = [
    { mode: 'Cash', amount: 25450, transactions: 120, status: 'Completed' },
    { mode: 'UPI', amount: 18650, transactions: 104, status: 'Completed' },
    { mode: 'PhonePe', amount: 10250, transactions: 98, status: 'Completed' },
    { mode: 'Google Pay', amount: 8450, transactions: 72, status: 'Completed' },
    { mode: 'Card', amount: 2350, transactions: 25, status: 'Completed' },
  ];
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  const handleViewAllPayments = () => {
    alert('Viewing all payments!'); 
  };

  // CSV डाउनलोड करने का वर्किंग फंक्शन
  const handleDownloadCSV = () => {
    const headers = ['Payment Mode', 'Amount', 'Transactions', 'Status'];
    
    const csvRows = paymentMethods.map(method => 
      [
        `"${method.mode}"`, 
        method.amount, 
        method.transactions, 
        method.status
      ].join(',')
    );
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'payment_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="payment-management-container">
      
      {/* ऊपरी दाएं कोने में वर्किंग डाउनलोड बटन के साथ हेडर रैपर */}
      <div className="payment-header-wrapper">
        <div className="payment-header">
          PAYMENT MANAGEMENT
        </div>
        <div className="payment-header-actions">
          <button 
            type="button" 
            className="pm-download-csv-btn"
            onClick={handleDownloadCSV}
          >
            <svg className="pm-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CSV
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Today's Collection</div>
          <div className="stat-value">{formatCurrency(paymentStats.today)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cash</div>
          <div className="stat-value">{formatCurrency(paymentStats.cash)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">UPI</div>
          <div className="stat-value">{formatCurrency(paymentStats.upi)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Due Amount</div>
          <div className="stat-value">{formatCurrency(paymentStats.due)}</div>
        </div>
      </div>

      {/* टेबल सेक्शन */}
      <div className="table-responsive-wrapper">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th>Transactions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => (
              <tr key={index}>
                <td data-label="Payment Mode">{method.mode}</td>
                <td data-label="Amount" className="amount-col">{formatCurrency(method.amount)}</td>
                <td data-label="Transactions" className="transactions-col">{method.transactions}</td>
                <td data-label="Status">
                  <span className="status-completed">{method.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* बॉटम बटन */}
      <div className="button-container">
        <button className="view-all-btn" onClick={handleViewAllPayments}>
          View All Payments
        </button>
      </div>
    </div>
  );
};

export default Paymentmanagement;