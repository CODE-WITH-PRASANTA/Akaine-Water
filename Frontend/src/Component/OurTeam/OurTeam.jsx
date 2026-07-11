import React, { useState } from 'react';
import './OurTeam.css';

// Importing your local assets from the project structure provided
import ourteam1 from '../../assets/ourteam1.webp';
import ourteam2 from '../../assets/ourteam2.webp';
import ourteam3 from '../../assets/ourteam3.webp';
import ourteam4 from '../../assets/ourteam4.webp';
import ourteam5 from '../../assets/ourteam5.webp';
import ourteam6 from '../../assets/ourteam6.webp';
import ourteam7 from '../../assets/ourteam7.webp';
import ourteam8 from '../../assets/ourteam8.webp';

const OurTeam = () => {
  const teamMembers = [
    { id: 1, name: 'BALDWIN CALEB', role: 'Founder', image: ourteam1, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 2, name: 'DALE HAROLD', role: 'Manager', image: ourteam2, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 3, name: 'AMELIA ISABELLA', role: 'Quality Head', image: ourteam3, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 4, name: 'FABIAN BARRIE', role: 'Operator', image: ourteam4, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 5, name: 'DALE HAROLD', role: 'Manager', image: ourteam5, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 6, name: 'FABIAN BARRIE', role: 'Operator', image: ourteam6, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 7, name: 'BALDWIN CALEB', role: 'Founder', image: ourteam7, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    { id: 8, name: 'FABIAN BARRIE', role: 'Operator', image: ourteam8, facebook: 'https://facebook.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  ];

  return (
    <div className="team-container">
      <div className="team-grid">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

const TeamCard = ({ member }) => {
  const [isShareActive, setIsShareActive] = useState(false);

  return (
    <div className="team-card">
      <div className="image-box">
        <img src={member.image} alt={member.name} />
        {/* Dark screen image layer triggers only when share button reveals menu */}
        <div className={`dark-overlay ${isShareActive ? 'dimmed' : ''}`}></div>
      </div>

      <div className="info-box-wrapper">
        {/* Social Media Popup uplifted cleanly over the share button and sky ring */}
        <div className={`social-popup ${isShareActive ? 'open' : ''}`}
             onMouseEnter={() => setIsShareActive(true)}
             onMouseLeave={() => setIsShareActive(false)}>
          <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* Sky Blue Interaction Ring */}
        <div className={`share-ring ${isShareActive ? 'visible' : ''}`}></div>
        
        {/* Main Share Toggle Target */}
        <button 
          className={`share-btn ${isShareActive ? 'active' : ''}`}
          onMouseEnter={() => setIsShareActive(true)}
          onMouseLeave={() => setIsShareActive(false)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>

        <div className="info-box">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;