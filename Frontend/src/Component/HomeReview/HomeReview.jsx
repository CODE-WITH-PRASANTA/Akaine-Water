import React, { useEffect, useState } from 'react';
import './HomeReview.css';

// Reusable component to handle the running number function
const RunningCounter = ({ endValue, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const numericEnd = parseFloat(endValue);
    if (isNaN(numericEnd)) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = percentage * numericEnd;
      
      // Preserve floating point decimals if the original string has one (like 6.8)
      if (endValue.toString().includes('.')) {
        setCount(currentCount.toFixed(1));
      } else {
        setCount(Math.floor(currentCount));
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const HomeReview = () => {
  const stats = [
    { id: 1, value: "6.8", suffix: "k", label: "Water Bottled\nDelivered", className: "stat-item item-1" },
    { id: 2, value: "8", suffix: "+", label: "Years Of\nExperienced", className: "stat-item item-2" },
    { id: 3, value: "45", suffix: "", label: "Professional Team\nMembers", className: "stat-item item-3" },
    { id: 4, value: "27", suffix: "", label: "Currently Serving\nAreas In City", className: "stat-item item-4" },
    { id: 5, value: "760", suffix: "", label: "Customers\nHappy With Us", className: "stat-item item-5" }
  ];

  return (
    <section className="review-container">
      <div className="review-grid">
        {stats.map((stat) => (
          <div key={stat.id} className={stat.className}>
            <h2 className="stat-number">
              <RunningCounter endValue={stat.value} suffix={stat.suffix} />
            </h2>
            <p className="stat-label">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeReview;