import React from 'react';
import './HomeDeliveredProcess.css';

const HomeDeliveredProcess = () => {
  const steps = [
    {
      id: '01',
      title: 'Order Your Bottle',
      desc: 'Foresee the pain and trouble that are bound to ensue and equal blame fail.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <path d="M10 9H8" />
        </svg>
      )
    },
    {
      id: '02',
      title: 'Touchless Packing',
      desc: 'Our power of choice is untrammelled and when nothing prevents our being able.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      )
    },
    {
      id: '03',
      title: 'On Time Deliver',
      desc: 'Business will frequently occur that who pleasures have to be repudiated & accepted.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="HomeDeliveredProcess-container">
      {/* Header Block Section */}
      <div className="HomeDeliveredProcess-headerBlock">
        <h2 className="HomeDeliveredProcess-heading">A higher standard of water delivered process</h2>
        <svg className="HomeDeliveredProcess-wave" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Process Sequence Grid */}
      <div className="HomeDeliveredProcess-grid">
        {steps.map((step) => (
          <div key={step.id} className="HomeDeliveredProcess-card">
            
            {/* Step Number Badge Module */}
            <div className="HomeDeliveredProcess-numberWrapper">
              <span className="HomeDeliveredProcess-stepTag">STEP</span>
              <span className="HomeOurProducts-cardId">{step.id}</span>
            </div>

            {/* Core Info Description Blocks */}
            <h3 className="HomeDeliveredProcess-title">{step.title}</h3>
            <p className="HomeDeliveredProcess-desc">{step.desc}</p>

            {/* Interactive Vector Icon Group Container */}
            <div className="HomeDeliveredProcess-iconOuterRing">
              <div className="HomeDeliveredProcess-iconInnerCircle">
                {step.icon}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDeliveredProcess;