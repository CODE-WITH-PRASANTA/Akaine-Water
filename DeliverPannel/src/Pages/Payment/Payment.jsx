import React, { useState } from 'react';
import './Payment.css';
import purseImage from '../../assets/p1.png'; // Ensure this path is correct

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [selectedMethod, setSelectedMethod] = useState("Cash");

  const customer = { name: "Rahul Kumar", totalAmount: 200, collectedAmount: 160 };

  return (
    <div className="pay-container">
      <div className="pay-card">
        <h2 className="cust-name">{customer.name}</h2>
        
        <div className="amount-grid">
          <div className="amount-box">
            <p>Total Amount</p>
            <h3>₹{customer.totalAmount}</h3>
          </div>
          <div className="amount-box">
            <p>Collected</p>
            <h3 className="text-blue">₹{customer.collectedAmount}</h3>
          </div>
        </div>

        <div className="pay-content">
          <div className="pay-left">
            <label className="section-label">Payment Method</label>
            {["Cash", "UPI", "PhonePe", "Google Pay", "Card"].map((method) => (
              <label key={method} className={`radio-label ${selectedMethod === method ? 'active' : ''}`}>
                <input 
                  type="radio" name="method" value={method} 
                  checked={selectedMethod === method} 
                  onChange={() => setSelectedMethod(method)} 
                />
                {method}
              </label>
            ))}

            <label className="section-label mt-20">Payment Status</label>
            <select className="status-select" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
              <option value="Paid">Paid</option>
              <option value="Advance">Advance</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div className="pay-right">
            <img src={purseImage} alt="Payment" className="wallet-img" />
          </div>
        </div>

        <button className="save-btn">Save Payment</button>
      </div>
    </div>
  );
};

export default Payment;