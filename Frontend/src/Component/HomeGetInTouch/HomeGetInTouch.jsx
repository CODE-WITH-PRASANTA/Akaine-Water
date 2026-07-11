import React, { useState } from 'react';
import './HomeGetInTouch.css';

// --- OVERLAPPING DESIGN BACKGROUND IMAGE ASSET ---
import deliveryBg from '../../assets/about-style2.jpg'; 

const HomeGetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Submitted Data:", formData);
    alert(`Thank you ${formData.name || 'there'}! Your enquiry has been received.`);
  };

  return (
    <section className="HomeGetInTouch-wrapper">
      <div className="HomeGetInTouch-container">
        
        {/* --- LEFT COLUMN: CONTENT & INFORMATION --- */}
        <div className="HomeGetInTouch-leftColumn">
          
          {/* Decorative Fine-Line Waterdrop Backdrop Vector */}
          <div className="HomeGetInTouch-waterdropBackdrop">
            <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 20C200 20 370 180 370 320C370 413.888 293.888 490 200 490C106.112 490 30 413.888 30 320C30 180 200 20 200 20Z" stroke="#e6eefd" strokeWidth="2" fill="none"/>
              <path d="M120 250C70 290 60 360 100 410" stroke="#e6eefd" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <div className="HomeGetInTouch-contentShift">
            <span className="HomeGetInTouch-tagline">GET IN TOUCH</span>
            <h2 className="HomeGetInTouch-heading">Love to assist<br />with your enquiry!</h2>
            
            {/* Blue Tiny Wave Text Accent */}
            <svg className="HomeGetInTouch-waveAccent" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>

            {/* Quick Contact Block */}
            <div className="HomeGetInTouch-contactRow">
              <div className="HomeGetInTouch-phoneIconCircle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.59c0-.55-.45-1-1-1zM6a1 1 0 0 0-2 0h2z"/>
                  <circle cx="15" cy="6" r="1"/>
                  <circle cx="18" cy="6" r="1"/>
                  <circle cx="21" cy="6" r="1"/>
                </svg>
              </div>
              <div className="HomeGetInTouch-contactText">
                <span className="HomeGetInTouch-contactLabel">Quick Contact</span>
                <a href="tel:+180050033333" className="HomeGetInTouch-phoneNumber">+1-800-500-333-33</a>
              </div>
            </div>

            <p className="HomeGetInTouch-description">
              Please feel free to call us with any questions or to set up your account.
            </p>

            <button type="button" className="HomeGetInTouch-readMoreBtn">
              READ MORE
            </button>
          </div>

          {/* Overlapping Floating Circle Badges System */}
          <div className="HomeGetInTouch-floatingBadgeContainer">
            <div className="HomeGetInTouch-badgeRing ringOne"></div>
            <div className="HomeGetInTouch-badgeRing ringTwo"></div>
            <div className="HomeGetInTouch-solidBadge">
              <span className="HomeGetInTouch-badgeTextTop">Top</span>
              <span className="HomeGetInTouch-badgeTextMiddle">Customer</span>
              <span className="HomeGetInTouch-badgeTextBottom">Support</span>
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: INTERACTIVE FORM CONTAINER --- */}
        <div className="HomeGetInTouch-rightColumn" style={{ backgroundImage: `url(${deliveryBg})` }}>
          <div className="HomeGetInTouch-formOverlayMask"></div>
          
          <form onSubmit={handleSubmit} className="HomeGetInTouch-enquiryCard">
            <h3 className="HomeGetInTouch-formTitle">Enquire With Our Team</h3>
            
            {/* Input Row: Your Name */}
            <div className="HomeGetInTouch-inputWrapper">
              <div className="HomeGetInTouch-fieldIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name *" 
                required
                className="HomeGetInTouch-inputField"
              />
            </div>

            {/* Input Row: Email Address */}
            <div className="HomeGetInTouch-inputWrapper">
              <div className="HomeGetInTouch-fieldIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                className="HomeGetInTouch-inputField"
              />
            </div>

            {/* Input Row: Select Service Dropdown */}
            <div className="HomeGetInTouch-inputWrapper">
              <div className="HomeGetInTouch-fieldIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
              </div>
              <select 
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="HomeGetInTouch-selectField"
              >
                <option value="" disabled hidden>Service You Need</option>
                <option value="bottled-delivery">Premium Bottled Water Delivery</option>
                <option value="dispenser-rent">Water Dispenser Rental Solutions</option>
                <option value="custom-filter">Residential Filtration Upgrade</option>
              </select>
              <div className="HomeGetInTouch-dropdownArrowCircle">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Input Row: Your Address */}
            <div className="HomeGetInTouch-inputWrapper">
              <div className="HomeGetInTouch-fieldIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your Address" 
                className="HomeGetInTouch-inputField"
              />
            </div>

            <button type="submit" className="HomeGetInTouch-continueBtn">
              CONTINUE
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default HomeGetInTouch;