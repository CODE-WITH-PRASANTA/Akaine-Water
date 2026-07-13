import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar } from 'react-icons/fa';
import './Testimonials.css';

// Ensure these images are in your assets folder
import user1 from "../../assets/cl1.jpg";
import user2 from "../../assets/cl2.jpg";
import user3 from "../../assets/cl3.jpg";

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const data = [
    { id: 1, name: "California", text: "Have used their service for five years & can say the service has always been amazing.", rating: 4, img: user1, title: "GREAT TASTING WATER" },
    { id: 2, name: "Los Angeles", text: "The team was very professional and answered all my questions in person.", rating: 5, img: user2, title: "PROFESSIONAL TEAM" },
    { id: 3, name: "Los Angeles", text: "The water is delicious and fresh. Highly recommend!", rating: 4, img: user3, title: "THE WATER IS DELICIOUS" },
    { id: 4, name: "New York", text: "Excellent delivery speed and quality. Very consistent.", rating: 5, img: user1, title: "TOP NOTCH SERVICE" },
    { id: 5, name: "Chicago", text: "Very happy with the subscription plans and pricing.", rating: 4, img: user2, title: "GREAT VALUE" },
    { id: 6, name: "Texas", text: "Best water service I have ever used. Prompt delivery.", rating: 5, img: user3, title: "HIGHLY RECOMMEND" }
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <span className="testimonials-subheading">TESTIMONIALS</span>
        <h2 className="testimonials-main-title">Here's what our customers say</h2>
      </div>

      <div className="testimonials-container">
        {currentItems.map((item) => (
          <div key={item.id} className="testimonial-card">
            <div className="quote-icon"><FaQuoteLeft /></div>
            <div className="stars">
              {[...Array(5)].map((_, i) => i < item.rating ? <FaStar key={i} color="#004a99" /> : <FaRegStar key={i} color="#004a99" />)}
            </div>
            <p className="testimonial-text">{item.text}</p>
            <img src={item.img} alt={item.name} className="user-img" />
            <h4 className="testimonial-heading">{item.title}</h4>
            <span className="user-location">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </section>
  );
};

export default Testimonials;