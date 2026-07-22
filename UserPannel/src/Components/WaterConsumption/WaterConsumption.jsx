import React, { useState } from 'react';
import { 
  ChevronDown, 
  CalendarDays, 
  CalendarClock, 
  MapPin, 
  MessageSquareWarning 
} from 'lucide-react';
import './WaterConsumption.css';

const WaterConsumption = () => {
  // State for Dropdown Selection
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 6 Months');

  // State for Live Chart Tooltip Hover
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Dataset mapping for the chart points
  const chartData = [
    { month: 'May', value: 3, cx: 65, cy: 165, label: '3 Jars' },
    { month: 'Jun', value: 6, cx: 145, cy: 130, label: '6 Jars' },
    { month: 'Jul', value: 5.3, cx: 225, cy: 138, label: '5.3 Jars' },
    { month: 'Aug', value: 9.1, cx: 305, cy: 72, label: '9.1 Jars' },
    { month: 'Sep', value: 6.2, cx: 385, cy: 120, label: '6.2 Jars' },
    { month: 'Oct', value: 3.5, cx: 465, cy: 145, label: '3.5 Jars' }
  ];

  const handleSelectRange = (range) => {
    setSelectedRange(range);
    setDropdownOpen(false);
  };

  return (
    <div className="water-dashboard-container">
      
      {/* 1. Monthly Water Consumption Chart Card */}
      <div className="water-card">
        <div className="water-card-header">
          <h2 className="water-card-title">Monthly Water Consumption</h2>
          
          {/* Functional Dropdown */}
          <div className="dropdown-container">
            <button 
              className="dropdown-badge" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedRange} <ChevronDown size={14} />
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={() => handleSelectRange('Last 3 Months')}>Last 3 Months</li>
                <li className="dropdown-item" onClick={() => handleSelectRange('Last 6 Months')}>Last 6 Months</li>
                <li className="dropdown-item" onClick={() => handleSelectRange('This Year')}>This Year</li>
              </ul>
            )}
          </div>
        </div>

        <div className="chart-container">
          {/* Active Live Hover Tooltip */}
          {activeTooltip && (
            <div 
              className="chart-tooltip" 
              style={{ left: `${(activeTooltip.cx / 500) * 100}%`, top: `${activeTooltip.cy - 15}px` }}
            >
              {activeTooltip.month}: {activeTooltip.label}
            </div>
          )}

          <svg viewBox="0 0 500 200" className="custom-line-chart">
            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background Horizontal Guide Lines */}
            <line x1="40" y1="20" x2="480" y2="20" className="chart-grid-line" />
            <line x1="40" y1="55" x2="480" y2="55" className="chart-grid-line" />
            <line x1="40" y1="90" x2="480" y2="90" className="chart-grid-line" />
            <line x1="40" y1="125" x2="480" y2="125" className="chart-grid-line" />
            <line x1="40" y1="160" x2="480" y2="160" className="chart-grid-line" />

            {/* Y-Axis Labels */}
            <text x="5" y="24" className="chart-axis-label">10 Jar</text>
            <text x="5" y="59" className="chart-axis-label">8 Jar</text>
            <text x="5" y="94" className="chart-axis-label">6 Jar</text>
            <text x="5" y="129" className="chart-axis-label">4 Jar</text>
            <text x="5" y="164" className="chart-axis-label">2 Jar</text>
            <text x="5" y="195" className="chart-axis-label">0 Jar</text>

            {/* Area Fill Gradient Path */}
            <path 
              d="M 65,165 C 140,130 215,100 290,80 C 365,60 415,120 465,145 L 465,175 L 65,175 Z" 
              className="chart-area-gradient" 
            />

            {/* Main Smooth Line Path */}
            <path 
              d="M 65,165 C 140,130 215,100 290,80 C 365,60 415,120 465,145" 
              className="chart-line" 
            />

            {/* Interactive Data Points & Labels */}
            {chartData.map((item, index) => (
              <g key={index}>
                <circle 
                  cx={item.cx} 
                  cy={item.cy} 
                  r="6" 
                  className={`chart-data-point ${activeTooltip?.month === item.month ? 'active' : ''}`}
                  onMouseEnter={() => setActiveTooltip(item)}
                  onMouseLeave={() => setActiveTooltip(null)}
                />
                <text x={item.cx - 10} y="195" className="chart-axis-label">{item.month}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* 2. Quick Actions Card */}
      <div className="water-card">
        <div className="water-card-header">
          <h2 className="water-card-title">Quick Actions</h2>
        </div>

        <div className="quick-actions-grid">
          <div className="action-tile blue">
            <div className="action-icon-wrapper">
              <CalendarDays size={22} />
            </div>
            <p className="action-label">Place New Order</p>
          </div>

          <div className="action-tile green">
            <div className="action-icon-wrapper">
              <CalendarClock size={22} />
            </div>
            <p className="action-label">Schedule Delivery</p>
          </div>

          <div className="action-tile orange">
            <div className="action-icon-wrapper">
              <MapPin size={22} />
            </div>
            <p className="action-label">Update Address</p>
          </div>

          <div className="action-tile purple">
            <div className="action-icon-wrapper">
              <MessageSquareWarning size={22} />
            </div>
            <p className="action-label">Help & Support</p>
          </div>
        </div>
      </div>

      {/* 3. Refer & Earn Card */}
      <div className="water-card refer-earn-card">
        <div className="refer-content">
          <h2 className="refer-title">Refer & Earn</h2>
          <p className="refer-description">Invite your friends and earn exciting rewards!</p>
          <button className="refer-btn">Refer Now</button>
        </div>

        <div className="refer-graphic">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 45L75 75M75 45L45 75" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <rect x="35" y="55" width="50" height="45" rx="6" fill="#FACC15" />
            <path d="M30 45H90V55H30V45Z" fill="#EAB308" rx="2" />
            <path d="M55 30C50 20 35 25 45 40C48 44 55 45 55 45V30Z" fill="#FDE047" />
            <path d="M65 30C70 20 85 25 75 40C72 44 65 45 65 45V30Z" fill="#FDE047" />
            <circle cx="60" cy="37" r="5" fill="#CA8A04" />
            {/* Sparkles */}
            <path d="M20 35L22 40L27 42L22 44L20 49L18 44L13 42L18 40L20 35Z" fill="#FEF08A" />
            <path d="M95 75L96 78L99 79L96 80L95 83L94 80L91 79L94 78L95 75Z" fill="#FEF08A" />
            <circle cx="100" cy="50" r="3" fill="#FEF08A" />
            <circle cx="25" cy="70" r="2.5" fill="#FEF08A" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default WaterConsumption;