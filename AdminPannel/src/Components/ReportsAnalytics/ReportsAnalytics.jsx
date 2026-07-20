import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  // Data for "Top Delivery Boys" matching reference image exactly
  const deliveryBoys = [
    { id: 1, name: "Amit Verma", earnings: "₹18,450" },
    { id: 2, name: "Priya Sahoo", earnings: "₹15,230" },
    { id: 3, name: "Suresh Das", earnings: "₹12,000" },
    { id: 4, name: "Rahul Nayak", earnings: "₹10,630" },
    { id: 5, name: "Arif Khan", earnings: "₹9,350" },
  ];

  // Data representing the heights of the bars in the Daily Sales bar chart (scaled to % of container)
  const barData = [
    { label: "11 Oct", height: "38%" },
    { label: "12 Oct", height: "65%" },
    { label: "13 Oct", height: "82%" },
    { label: "14 Oct", height: "52%" },
    { label: "15 Oct", height: "74%" },
    { label: "16 Oct", height: "95%" },
    { label: "17 Oct", height: "50%" },
  ];

  // कार्यशील डाउनलोड हैंडलर फ़ंक्शन
  const handleDownload = () => {
    const headers = ['Type', 'Name/Label', 'Value/Height'];
    const rows = [];

    // Daily Sales डेटा जोड़ना
    barData.forEach(bar => {
      rows.push(['Daily Sales Bar', bar.label, bar.height]);
    });

    // Top Delivery Boys डेटा जोड़ना
    deliveryBoys.forEach(boy => {
      rows.push(['Top Delivery Boy', boy.name, boy.earnings]);
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'Reports_and_Analytics_Report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-analytics-container">
      {/* टाइटल और डाउनलोड बटन के लिए हेडर रैपर */}
      <div className="reports-analytics-header">
        <h2 className="reports-analytics-title">REPORTS &amp; ANALYTICS</h2>
        <button className="reports-analytics-download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>

      {/* Grid Layout of the Three Cards */}
      <div className="reports-analytics-grid">
        
        {/* Card 1: Daily Sales */}
        <div className="reports-analytics-card">
          <h3 className="reports-analytics-card-title">Daily Sales</h3>
          
          <div className="reports-analytics-bar-chart-container">
            {/* Y-Axis Scale Labels */}
            <div className="reports-analytics-y-axis">
              <span>5K</span>
              <span>4K</span>
              <span>2K</span>
              <span>2K</span>
              <span>0</span>
            </div>

            {/* Chart Bars Area */}
            <div className="reports-analytics-chart-area">
              {/* Background grid lines */}
              <div className="reports-analytics-grid-lines">
                <div className="reports-analytics-line"></div>
                <div className="reports-analytics-line"></div>
                <div className="reports-analytics-line"></div>
                <div className="reports-analytics-line"></div>
                <div className="reports-analytics-line"></div>
              </div>

              {/* Individual Bars */}
              <div className="reports-analytics-bars-container">
                {barData.map((bar, index) => (
                  <div key={index} className="reports-analytics-bar-wrapper">
                    <div 
                      className="reports-analytics-bar" 
                      style={{ height: bar.height }}
                    ></div>
                    <span className="reports-analytics-bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Color Key Legends */}
          <div className="reports-analytics-legend-grid">
            <div className="reports-analytics-legend-item">
              <span className="reports-analytics-dot orange"></span>
              <span>Orders</span>
            </div>
            <div className="reports-analytics-legend-item">
              <span className="reports-analytics-dot light-green"></span>
              <span>Sales</span>
            </div>
            <div className="reports-analytics-legend-item">
              <span className="reports-analytics-dot light-blue"></span>
              <span>Revenue</span>
            </div>
            <div className="reports-analytics-legend-item">
              <span className="reports-analytics-dot dark-green"></span>
              <span>Revenue</span>
            </div>
          </div>
        </div>

        {/* Card 2: Top Products */}
        <div className="reports-analytics-card">
          <h3 className="reports-analytics-card-title">Top Products</h3>
          
          <div className="reports-analytics-pie-chart-container">
            {/* Donut Chart representation via conic-gradient */}
            <div className="reports-analytics-donut-chart">
              <div className="reports-analytics-donut-hole"></div>
            </div>
          </div>

          {/* Legends */}
          <div className="reports-analytics-donut-legends">
            <div className="reports-analytics-donut-legend-item">
              <span className="reports-analytics-square blue"></span>
              <span>20L Bottle</span>
            </div>
            <div className="reports-analytics-donut-legend-item">
              <span className="reports-analytics-square light-gray"></span>
              <span>10L Bottle</span>
            </div>
            <div className="reports-analytics-donut-legend-item">
              <span className="reports-analytics-square dark-blue"></span>
              <span>5L Bottle</span>
            </div>
            <div className="reports-analytics-donut-legend-item">
              <span className="reports-analytics-square slate-gray"></span>
              <span>1L Bottle</span>
            </div>
            <div className="reports-analytics-donut-legend-item">
              <span className="reports-analytics-square navy-blue"></span>
              <span>Others</span>
            </div>
          </div>
        </div>

        {/* Card 3: Top Delivery Boys */}
        <div className="reports-analytics-card">
          <h3 className="reports-analytics-card-title">Top Delivery Boys</h3>
          <div className="reports-analytics-delivery-list">
            {deliveryBoys.map((boy) => (
              <div key={boy.id} className="reports-analytics-delivery-row">
                <div className="reports-analytics-user-info">
                  <FaUserCircle className="reports-analytics-user-avatar" />
                  <span className="reports-analytics-user-name">{boy.name}</span>
                </div>
                <span className="reports-analytics-user-earnings">{boy.earnings}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Center aligned Button */}
      <div className="reports-analytics-footer">
        <button className="reports-analytics-view-btn">View All Reports</button>
      </div>
    </div>
  );
};

export default ReportsAnalytics;