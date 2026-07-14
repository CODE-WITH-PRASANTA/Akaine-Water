import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './EmptyReturn.css';

// Importing jar images from src/assets as requested
import jarLeft from '../../assets/jar.jpg'; // Update path if needed based on your folder structure
import jarRight from '../../assets/jar.jpg'; 

const EmptyReturn = () => {
  // --- Left Card State (Add Extra Stock) ---
  const [extraProduct, setExtraProduct] = useState('20L');
  const [extraQty, setExtraQty] = useState(1);
  const [reason, setReason] = useState('Customer Requested');

  // Pricing helper based on selected size
  const getPricePerJar = (size) => {
    if (size === '20L') return 80;
    if (size === '15L') return 60;
    return 40; // 10L
  };

  const totalAmount = extraQty * getPricePerJar(extraProduct);

  const handleExtraStockSubmit = (e) => {
    e.preventDefault();
    console.log('Add Extra Stock Submitted:', {
      productSize: extraProduct,
      quantity: extraQty,
      totalAmount,
      reason
    });
    alert(`Extra Stock Added!\nProduct: ${extraProduct}\nQty: ${extraQty}\nTotal: ₹${totalAmount}`);
  };

  // --- Right Card State (Empty Bottle Return) ---
  const [customerId, setCustomerId] = useState('');
  const [returnProduct, setReturnProduct] = useState('20L');
  const [returnQty, setReturnQty] = useState(1);
  const [condition, setCondition] = useState('Good');
  const [remarks, setRemarks] = useState('');

  const handleEmptyReturnSubmit = (e) => {
    e.preventDefault();
    console.log('Empty Return Submitted:', {
      customerId,
      productSize: returnProduct,
      quantity: returnQty,
      condition,
      remarks
    });
    alert(`Return Saved!\nCustomer ID: ${customerId}\nQty: ${returnQty} Jars (${returnProduct})\nCondition: ${condition}`);
  };

  return (
    <div className="empty-return-container">
      <div className="empty-return-wrapper">
        
        {/* ================= LEFT CARD: ADD EXTRA STOCK ================= */}
        <div className="empty-return-card">
          <div className="empty-return-card-header">
            <span className="empty-return-badge"></span>
            <h2 className="empty-return-title">Add Extra Stock</h2>
          </div>

          <form onSubmit={handleExtraStockSubmit} className="empty-return-form-content">
            <div className="empty-return-form-left">
              
              <div className="empty-return-form-group">
                <label className="empty-return-label">Product Size</label>
                <select 
                  className="empty-return-select" 
                  value={extraProduct} 
                  onChange={(e) => setExtraProduct(e.target.value)}
                >
                  <option value="20L">20L Water Jar</option>
                  <option value="15L">15L Water Jar</option>
                  <option value="10L">10L Water Jar</option>
                </select>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Extra Jars</label>
                <div className="empty-return-counter">
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setExtraQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="empty-return-counter-value">{extraQty}</span>
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setExtraQty(prev => prev + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Total Amount</label>
                <div className="empty-return-amount">₹{totalAmount}</div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Reason</label>
                <select 
                  className="empty-return-select" 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="Customer Requested">Customer Requested</option>
                  <option value="Event / Party">Event / Party</option>
                  <option value="Damaged Replacement">Damaged Replacement</option>
                </select>
              </div>

            </div>

            <div className="empty-return-form-right">
              <img src={jarLeft} alt="Water Jar Extra Stock" className="empty-return-jar-img" />
            </div>

            <button type="submit" className="empty-return-submit-btn blue-btn">
              Add &amp; Update Stock
            </button>
          </form>
        </div>

        {/* ================= RIGHT CARD: EMPTY BOTTLE RETURN ================= */}
        <div className="empty-return-card">
          <div className="empty-return-card-header">
            <span className="empty-return-badge"></span>
            <h2 className="empty-return-title">Empty Bottle Return</h2>
          </div>

          <form onSubmit={handleEmptyReturnSubmit} className="empty-return-form-content">
            <div className="empty-return-form-left">
              
              <div className="empty-return-form-group">
                <label className="empty-return-label">Customer ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Customer ID" 
                  className="empty-return-input"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Product Name</label>
                <div className="empty-return-checkbox-group">
                  {['20L', '15L', '10L'].map((size) => (
                    <label key={size} className="empty-return-checkbox-label">
                      <input 
                        type="checkbox" 
                        className="empty-return-checkbox" 
                        checked={returnProduct === size}
                        onChange={() => setReturnProduct(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Quantity</label>
                <div className="empty-return-counter">
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setReturnQty(prev => Math.max(1, prev - 1))}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="empty-return-counter-value">{returnQty}</span>
                  <button 
                    type="button" 
                    className="empty-return-counter-btn"
                    onClick={() => setReturnQty(prev => prev + 1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Condition</label>
                <div className="empty-return-radio-group">
                  {['Good', 'Not Returned', 'Average'].map((cond) => (
                    <label key={cond} className="empty-return-radio-label">
                      <input 
                        type="radio" 
                        name="condition"
                        value={cond}
                        className="empty-return-radio" 
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="empty-return-form-group">
                <label className="empty-return-label">Remarks (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter remarks..." 
                  className="empty-return-input"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

            </div>

            <div className="empty-return-form-right">
              <img src={jarRight} alt="Water Jar Return" className="empty-return-jar-img" />
            </div>

            <button type="submit" className="empty-return-submit-btn blue-btn">
              Save Return
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EmptyReturn;