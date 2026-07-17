import React, { useState } from 'react';
import './DashboardThird.css';

const DashboardThird = () => {
  // Assignees Data exactly matching the design
  const assigneesData = [
    {
      id: 1,
      name: 'Bob Frapples',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      open: 10,
      escalated: 3,
      completed: 126
    },
    {
      id: 2,
      name: 'Greta Life',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      open: 8,
      escalated: 20,
      completed: 154
    },
    {
      id: 3,
      name: 'Zack Lee',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      open: 5,
      escalated: 18,
      completed: 79
    },
    {
      id: 4,
      name: 'Paige Turner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      open: 15,
      escalated: 7,
      completed: 145
    },
    {
      id: 5,
      name: 'Mary Goround',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      open: 10,
      escalated: 3,
      completed: 126
    }
  ];

  // Independent hover states for different rows
  const [showMonTooltip, setShowMonTooltip] = useState(false);
  const [showWedTooltip, setShowWedTooltip] = useState(false);

  const handleAddProject = () => {
    alert('Add project button clicked!');
  };

  return (
    <div className="dashboard-container">
      {/* Left Card: Project Timeline */}
      <div className="dashboard-card timeline-card">
        <div className="card-header">
          <h2 className="card-title">Project timeline</h2>
          <button className="add-project-btn" onClick={handleAddProject}>
            + Add project
          </button>
        </div>

        <div className="timeline-chart">
          {/* Monday Row */}
          <div className="timeline-row">
            <span className="day-label">Mon</span>
            <div className="bar-container">
              <div className="bar series-1" style={{ left: '0%', width: '41.6%' }}></div>
              <div 
                className="bar series-2 relative-target" 
                style={{ left: '50%', width: '33.3%' }}
                onMouseEnter={() => setShowMonTooltip(true)}
                onMouseLeave={() => setShowMonTooltip(false)}
              >
                {showMonTooltip && (
                  <div className="timeline-tooltip">
                    <strong>Mon:</strong> 12 - 20
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tuesday Row */}
          <div className="timeline-row">
            <span className="day-label">Tue</span>
            <div className="bar-container">
              <div className="bar series-1" style={{ left: '41.6%', width: '37.5%' }}></div>
              <div className="bar series-2" style={{ left: '83.3%', width: '16.7%' }}></div>
            </div>
          </div>

          {/* Wednesday Row */}
          <div className="timeline-row">
            <span className="day-label">Wed</span>
            <div className="bar-container">
              <div 
                className="bar series-2 relative-target" 
                style={{ left: '41.6%', width: '16.7%' }}
                onMouseEnter={() => setShowWedTooltip(true)}
                onMouseLeave={() => setShowWedTooltip(false)}
              >
                {showWedTooltip && (
                  <div className="timeline-tooltip">
                    <strong>Wed:</strong> 10 - 14
                  </div>
                )}
              </div>
              <div className="bar series-1" style={{ left: '62.5%', width: '20.8%' }}></div>
            </div>
          </div>

          {/* Thursday Row */}
          <div className="timeline-row">
            <span className="day-label">Thu</span>
            <div className="bar-container">
              <div className="bar series-2" style={{ left: '20.8%', width: '20.8%' }}></div>
              <div className="bar series-1" style={{ left: '79.1%', width: '20.9%' }}></div>
            </div>
          </div>

          {/* X-Axis Timeline Rulers */}
          <div className="timeline-axis">
            <div className="axis-label-wrapper" style={{ left: '0%' }}><span>0</span></div>
            <div className="axis-label-wrapper" style={{ left: '33.3%' }}><span>8</span></div>
            <div className="axis-label-wrapper" style={{ left: '66.6%' }}><span>16</span></div>
            <div className="axis-label-wrapper" style={{ left: '100%' }}><span>24</span></div>
          </div>
        </div>

        {/* Legend */}
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot series-1-dot"></span>
            <span className="legend-text">Series-1</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot series-2-dot"></span>
            <span className="legend-text">Series-2</span>
          </div>
        </div>
      </div>

      {/* Right Card: Assignees */}
      <div className="dashboard-card assignees-card">
        <div className="card-header">
          <h2 className="card-title">Assignees</h2>
        </div>

        <div className="assignees-list">
          {assigneesData.map((assignee) => (
            <div key={assignee.id} className="assignee-row">
              <div className="assignee-profile">
                <img src={assignee.avatar} alt={assignee.name} className="assignee-avatar" />
                <span className="assignee-name">{assignee.name}</span>
              </div>
              
              <div className="assignee-stats">
                <div className="stat-box text-open">
                  <span className="stat-count">{assignee.open}</span>
                  <span className="stat-label">Open</span>
                </div>
                <div className="stat-box text-escalated">
                  <span className="stat-count">{assignee.escalated}</span>
                  <span className="stat-label">Escalated</span>
                </div>
                <div className="stat-box text-completed">
                  <span className="stat-count">{assignee.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardThird;