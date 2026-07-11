import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiFileText, 
  FiMapPin 
} from 'react-icons/fi';
import './Contact.css';

// -------------------------------------------------------------
// LOCAL ASSET IMPORTS
// -------------------------------------------------------------
import ContactsBannerBg from '../../assets/breadcrum.jpeg'; 

// Keeping the unsplash link as a placeholder for the map mockup
const MapMockupImg = "https://images.unsplash.com/photo-1524661135339-9140b00787e3?w=1600&auto=format&fit=crop&q=80";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message regarding "${formData.subject}" has been received.`);
  };

  return (
    <div className="ContactContainer">
      
      {/* COMPONENT WINDOW 1: SINGLE IMAGE HERO BANNER (60vh) */}
      <section className="ContactHeroBanner" style={{ backgroundImage: `url(${ContactsBannerBg})` }}>
        <div className="ContactHeroOverlay">
          <div className="ContactHeroContent">
            <h1 className="ContactHeroTitle">Contacts</h1>
            <div className="ContactHeroBreadcrumbs">
              <span className="ContactBreadcrumbLink">Home</span>
              <span className="ContactBreadcrumbDivider">//</span>
              <span className="ContactBreadcrumbActive">Contacts</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT WINDOW 2: SPLIT CONTACT FORM GRID */}
      <section className="ContactFormSection">
        <div className="ContactFormGrid">
          
          {/* Left Text / Info Panel */}
          <div className="ContactFormLeftPanel">
            <span className="ContactFormLabel">CONTACT FORM</span>
            <h2 className="ContactFormTitle">Have a questions?<br />Contact us now</h2>
            <p className="ContactFormDescription">
              Our service allows you to hide your geolocation, bypass blocking and protect your data. 
              Join over 150 thousand people who trust up to keep their life safe.
            </p>
            
            <div className="ContactFormInfoList">
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge"><FiPhone /></div>
                <span className="ContactFormInfoValue">+9-500-025-200</span>
              </div>
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge"><FiMapPin /></div>
                <span className="ContactFormInfoValue">256th North Neusvill Avenue, 19302, USA</span>
              </div>
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge"><FiMail /></div>
                <span className="ContactFormInfoValue">support@emailaddress.com</span>
              </div>
            </div>
          </div>

          {/* Right Inputs Column */}
          <div className="ContactFormRightPanel">
            <form onSubmit={handleFormSubmit} className="ContactFormElement">
              <div className="ContactFormInputRow">
                <div className="ContactFormInputWrapper">
                  <FiUser className="ContactFormInputIcon" />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="ContactFormInput" 
                    required
                  />
                </div>
                <div className="ContactFormInputWrapper">
                  <FiPhone className="ContactFormInputIcon" />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="ContactFormInput" 
                  />
                </div>
              </div>

              <div className="ContactFormInputRow">
                <div className="ContactFormInputWrapper">
                  <FiMail className="ContactFormInputIcon" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="ContactFormInput" 
                    required
                  />
                </div>
                <div className="ContactFormInputWrapper">
                  <FiFileText className="ContactFormInputIcon" />
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="ContactFormInput" 
                  />
                </div>
              </div>

              <div className="ContactFormTextareaWrapper">
                <textarea 
                  name="message"
                  placeholder="Message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="ContactFormTextarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="ContactFormActionRow">
                <button type="submit" className="ContactFormSubmitButton">
                  Send message
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* COMPONENT WINDOW 3: FULL WIDTH GOOGLE MAP */}
      {/* COMPONENT WINDOW 3: GOOGLE MAP (BHUBANESWAR, BAMPHAKUDA) */}
<section className="ContactMapSection">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14960.941323382745!2d85.9042459!3d20.37311115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190de625555555%3A0x2db4811f5fae8a8b!2sBamphakuda%2C%20Odisha!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
    className="ContactMapCanvas"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Bamphakuda Bhubaneswar Map"
  ></iframe>
</section>
      <section className="ContactMapSection">
        
        <div className="ContactMapCanvas" style={{ backgroundImage: `url(${MapMockupImg})` }}>
          <div className="ContactMapMockControls">
            <button className="ContactMapControlBtn active">Map</button>
            <button className="ContactMapControlBtn">Satellite</button>
          </div>
          
          <div className="ContactMapMockPinContainer">
            <div className="ContactMapMockPin">
              <FiMapPin />
            </div>
          </div>
          
          <div className="ContactMapMockFooter">
            <span>Keyboard shortcuts</span>
            <span>Map data ©2026 Google</span>
            <span>Terms</span>
            <span>Report a map error</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;