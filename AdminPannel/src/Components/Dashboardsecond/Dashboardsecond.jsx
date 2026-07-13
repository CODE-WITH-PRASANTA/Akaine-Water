import React from 'react';
import './Dashboardsecond.css';
import { SiFramer } from 'react-icons/si';
import { FaHandPeace } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { FiTrendingUp } from 'react-icons/fi';

const Dashboardsecond = () => {
  return (
    <div className="dashboardsecond-layout">
      <div className="dashboardsecond-grid">
        
        <div className="dashboardsecond-card">
          <div className="icon-box bg-framer">
            <SiFramer className="icon-framer" />
          </div>
          <div className="content-box">
            <div className="badge-row">
              <span className="text-muted">Completed</span>
              <span className="text-trend">+ 20% <FiTrendingUp className="trend-arrow" /></span>
            </div>
            <h3 className="card-heading">Total projects</h3>
            <p className="card-subheading">New users</p>
          </div>
        </div>

        <div className="dashboardsecond-card">
          <div className="icon-box bg-behance">
            <span className="behance-text-icon">Bē</span>
          </div>
          <div className="content-box">
            <div className="badge-row">
              <span className="text-muted">Completed</span>
              <span className="text-trend">+ 15% <FiTrendingUp className="trend-arrow" /></span>
            </div>
            <h3 className="card-heading">Behance project</h3>
            <p className="card-subheading">Users</p>
          </div>
        </div>

        <div className="dashboardsecond-card">
          <div className="icon-box bg-peace">
            <FaHandPeace className="icon-peace" />
          </div>
          <div className="content-box">
            <div className="badge-row">
              <span className="text-trend">Coming soon</span>
            </div>
            <h3 className="card-heading">10,000</h3>
            <p className="card-subheading">Agents</p>
          </div>
        </div>

        <div className="dashboardsecond-card">
          <div className="icon-box bg-speed circle">
            <IoSpeedometerOutline className="icon-speed" />
          </div>
          <div className="content-box">
            <div className="badge-row">
              <span className="text-muted">Monthly</span>
              <span className="text-trend">+ 10% <FiTrendingUp className="trend-arrow" /></span>
            </div>
            <h3 className="card-heading">36,000</h3>
            <p className="card-subheading">New project</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboardsecond;