import React, { useState } from 'react';
import './Paymentmanagement.css'; // CSS फ़ाइल को इम्पोर्ट करें

const Paymentmanagement = () => {
  // स्टैटिक डेटा (इसे आप अपनी API के अनुसार बदल सकते हैं)
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

  // करेंसी फॉर्मेट करने के लिए हेल्पर फ़ंक्शन (₹)
  const formatCurrency = (value) => {
    return '₹' + value.toLocaleString('en-IN');
  };

  const handleViewAllPayments = () => {
    alert('Viewing all payments!'); // बटन क्लिक होने पर एक्शन
  };

  return (
    <div className="payment-management-container">
      {/* हेडर: जिसमें से "5." हटा दिया गया है */}
      <div className="payment-header">
        PAYMENT MANAGEMENT
      </div>

      {/* टॉप कार्ड्स सेक्शन */}
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