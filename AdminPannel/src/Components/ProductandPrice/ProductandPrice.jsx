import React, { useState } from 'react';
import './ProductandPrice.css';

const ProductandPrice = () => {
  // प्रारंभिक डेटा (Initial Table Data)
  const [products, setProducts] = useState([
    { id: 1, name: '20L Bottle', size: '20 L', cost: 45.00, dealer: 70.00, retail: 80.00, tax: 0, status: 'Active' },
    { id: 2, name: '10L Bottle', size: '10 L', cost: 35.00, dealer: 55.00, retail: 60.00, tax: 0, status: 'Active' },
    { id: 3, name: '5L Bottle', size: '5 L', cost: 18.00, dealer: 30.00, retail: 35.00, tax: 0, status: 'Active' },
    { id: 4, name: '1L Bottle', size: '1 L', cost: 8.00, dealer: 15.00, retail: 18.00, tax: 0, status: 'Active' },
    { id: 5, name: '500ml Bottle', size: '500 ml', cost: 5.00, dealer: 10.00, retail: 12.00, tax: 0, status: 'Active' }
  ]);

  // पॉपअप फॉर्म की स्टेट
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // फॉर्म इनपुट स्टेट्स
  const [formData, setFormData] = useState({
    productName: '20L Bottle',
    size: '20 L',
    costPrice: '',
    dealerPrice: '',
    retailPrice: '',
    tax: 0,
    status: 'Active'
  });

  // इनपुट चेंज हैंडलर
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // फॉर्म सबमिट (Save) हैंडलर
  const handleSave = (e) => {
    e.preventDefault();
    
    // नया प्रोडक्ट ऑब्जेक्ट
    const newProduct = {
      id: products.length + 1,
      name: formData.productName,
      size: formData.size,
      cost: parseFloat(formData.costPrice) || 0,
      dealer: parseFloat(formData.dealerPrice) || 0,
      retail: parseFloat(formData.retailPrice) || 0,
      tax: parseInt(formData.tax) || 0,
      status: formData.status
    };

    setProducts([...products, newProduct]);
    closeModal();
  };

  // पॉपअप बंद करने का फंक्शन
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      productName: '20L Bottle',
      size: '20 L',
      costPrice: '',
      dealerPrice: '',
      retailPrice: '',
      tax: 0,
      status: 'Active'
    });
  };

  return (
    <div className="component-container">
      {/* 4. PRODUCT & PRICE CONTROL HEADER */}
      <div className="card-header">
        <h2>4. PRODUCT & PRICE CONTROL</h2>
      </div>

      <div className="card-body">
        {/* टेबल कंटेनर - रिस्पॉन्सिव स्क्रॉल के लिए */}
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th className="text-right">Cost Price</th>
                <th className="text-right">Dealer Price</th>
                <th className="text-right">Retail Price</th>
                <th className="text-right">Tax (%)</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.size}</td>
                  <td className="text-right">₹{prod.cost.toFixed(2)}</td>
                  <td className="text-right">₹{prod.dealer.toFixed(2)}</td>
                  <td className="text-right">₹{prod.retail.toFixed(2)}</td>
                  <td className="text-right">{prod.tax}%</td>
                  <td className="text-center">
                    <span className={`status-badge ${prod.status.toLowerCase()}`}>
                      {prod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add / Update Product बटन */}
        <div className="btn-container">
          <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
            Add / Update Product
          </button>
        </div>
      </div>

      {/* स्मूथ पॉपअप फॉर्म (Modal) */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className={`modal-content ${isModalOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <h3>Product & Price Details</h3>
          <hr className="modal-divider" />
          
          <form onSubmit={handleSave}>
            <div className="form-grid">
              {/* Product Dropdown */}
              <div className="form-group">
                <label>Product</label>
                <select name="productName" value={formData.productName} onChange={handleInputChange}>
                  <option value="20L Bottle">20L Bottle</option>
                  <option value="10L Bottle">10L Bottle</option>
                  <option value="5L Bottle">5L Bottle</option>
                  <option value="1L Bottle">1L Bottle</option>
                  <option value="500ml Bottle">500ml Bottle</option>
                </select>
              </div>

              {/* Size Dropdown */}
              <div className="form-group">
                <label>Size</label>
                <select name="size" value={formData.size} onChange={handleInputChange}>
                  <option value="20 L">20 L</option>
                  <option value="10 L">10 L</option>
                  <option value="5 L">5 L</option>
                  <option value="1 L">1 L</option>
                  <option value="500 ml">500 ml</option>
                </select>
              </div>

              {/* Cost Price */}
              <div className="form-group">
                <label>Cost Price (₹)</label>
                <input 
                  type="number" 
                  name="costPrice" 
                  placeholder="Enter Cost Price" 
                  value={formData.costPrice} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              {/* Dealer Price */}
              <div className="form-group">
                <label>Dealer Price (₹)</label>
                <input 
                  type="number" 
                  name="dealerPrice" 
                  placeholder="Enter Dealer Price" 
                  value={formData.dealerPrice} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              {/* Retailer Price */}
              <div className="form-group">
                <label>Retailer Price (₹)</label>
                <input 
                  type="number" 
                  name="retailPrice" 
                  placeholder="Enter Retail Price" 
                  value={formData.retailPrice} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              {/* Tax (%) */}
              <div className="form-group">
                <label>Tax (%)</label>
                <input 
                  type="number" 
                  name="tax" 
                  placeholder="Enter Tax percentage" 
                  value={formData.tax} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              {/* Action (Status Active/Inactive Dropdown) */}
              <div className="form-group full-width">
                <label>Action (Status)</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Save & Cancel Buttons */}
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductandPrice;