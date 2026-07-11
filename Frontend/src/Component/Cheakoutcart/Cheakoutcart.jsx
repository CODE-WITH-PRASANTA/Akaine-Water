import React, { useState } from 'react';
import './Cheakoutcart.css';

const Cheakoutcart = () => {
  // टेस्टिंग के लिए शुरुआती कार्ट डेटा (कार्ट खाली देखने के लिए आप इसे सीधे खाली ऐरे [] कर सकते हैं)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Quality Water Bottle", price: "$25.00", quantity: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Eco-Friendly Travel Mug", price: "$18.50", quantity: 2, image: "https://via.placeholder.com/80" }
  ]);

  // कार्ट से आइटम हटाने के लिए फ़ंक्शन
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // 'Return to shop' बटन क्लिक हैंडलर
  const handleReturnToShop = () => {
    window.location.href = '/shop'; // यदि react-router-dom उपयोग कर रहे हैं तो navigate('/shop') लिखें
  };

  return (
    <div className="checkout-cart-container">
      
      {cartItems.length === 0 ? (
        /* --- एम्प्टी कार्ट व्यू (यह बिल्कुल संदर्भ छवि के समान दिखेगा) --- */
        <div className="empty-cart-view">
          <div className="empty-cart-alert-strip">
            <span className="empty-cart-alert-text">Your cart is currently empty.</span>
          </div>
          
          <button className="return-to-shop-btn" onClick={handleReturnToShop}>
            Return to shop
          </button>
        </div>
      ) : (
        /* --- डायनेमिक एक्टिव कार्ट व्यू (जब आइटम्स मौजूद हों) --- */
        <div className="active-cart-view">
          <h2 className="active-cart-heading">Your Shopping Cart ({cartItems.length})</h2>
          
          <div className="active-cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="active-cart-item-card">
                <div className="active-cart-item-details">
                  <img src={item.image} alt={item.name} className="active-cart-item-img" />
                  <div>
                    <h4 className="active-item-title">{item.name}</h4>
                    <p className="active-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                </div>
                
                <div className="active-cart-item-actions">
                  <span className="active-item-price">{item.price}</span>
                  <button 
                    className="cart-remove-item-btn" 
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* डेवलपर टेस्टिंग के लिए छोटा हेल्पिंग बटन (कार्ट को खाली करने के लिए) */}
          <button className="simulate-empty-btn" onClick={() => setCartItems([])}>
            Simulate Empty Cart View
          </button>
        </div>
      )}
      
    </div>
  );
};

export default Cheakoutcart;