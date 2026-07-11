import React from 'react';
import './Popular.css';
import waterImage from '../../assets/ak.jpg'; // Ensure your image is named correctly

const questions = [
  "Where does your drinking water come from?",
  "Do you offer water delivery services for homes and offices?",
  "What sizes of water bottles or containers do you offer?",
  "Is your bottled water safe for infants and young children?"
];

const Popular = () => {
  return (
    <section className="popular-container">
      {/* Left Side: Questions */}
      <div className="popular-content">
        <h2 className="popular-title">Popular Questions About Drinking Water</h2>
        
        <div className="popular-list">
          {questions.map((q, index) => (
            <div key={index} className="popular-question-item">
              <span className="popular-plus-icon">+</span>
              <p>{q}</p>
            </div>
          ))}
        </div>

        <button className="popular-read-more">Read More</button>
      </div>

      {/* Right Side: Image */}
      <div className="popular-image-wrapper">
        <img src={waterImage} alt="Water glass and filters" className="popular-img" />
      </div>
    </section>
  );
};

export default Popular;