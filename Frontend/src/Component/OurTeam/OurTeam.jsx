import React, { useEffect, useState } from "react";
import './OurTeam.css';
import API, { IMG_URL } from "../../api/axios";

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await API.get("/team");

      if (response.data.success) {
        setTeamMembers(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="team-container">
        <p>Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="team-container">
      <div className="team-grid">
        {teamMembers.map((member) => (
          <TeamCard key={member._id || member.id} member={member} />
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
        <img
          src={`${IMG_URL}/uploads/${member.image}`}
          alt={member.fullName}/>

        {/* Dark overlay */}
        <div className={`dark-overlay ${isShareActive ? 'dimmed' : ''}`}></div>
      </div>

      <div className="info-box-wrapper">
        {/* Social Popup */}
        <div
          className={`social-popup ${isShareActive ? 'open' : ''}`}
          onMouseEnter={() => setIsShareActive(true)}
          onMouseLeave={() => setIsShareActive(false)}
        >
          {/* Facebook */}
          <a
            href={member.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
          </a>
        </div>

        {/* Sky Ring */}
        <div className={`share-ring ${isShareActive ? 'visible' : ''}`}></div>

        {/* Share Button */}
        <button
          className={`share-btn ${isShareActive ? 'active' : ''}`}
          onMouseEnter={() => setIsShareActive(true)}
          onMouseLeave={() => setIsShareActive(false)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>

        {/* Member Info */}
        <div className="info-box">
          <h3 className="member-name">{member.fullName}</h3>
          <p className="member-role">{member.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;