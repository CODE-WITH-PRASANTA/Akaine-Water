import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiChevronDown, FiX } from "react-icons/fi";

import "./Dashboard.css";

/* ------------------------------------------------------------------ */
/* Dummy data                                                          */
/* ------------------------------------------------------------------ */

const statsData = [
  { id: "total", label: "Total Orders", value: 45, sub: "Today's Orders", color: "blue" },
  { id: "pending", label: "Pending Deliveries", value: 18, sub: "Pending Orders", color: "red" },
  { id: "delivered", label: "Delivered Orders", value: 27, sub: "Completed", color: "green" },
  { id: "stock", label: "Extra Stock", value: 12, sub: "Extra Bottles", color: "yellow" },
  { id: "cash", label: "Cash Collection", value: "₹ 8,950", sub: "Today's Collection", color: "black" },
];

// Real-world-ish coordinates around Bhubaneswar
const homeBase = { lat: 20.3396, lng: 85.8022, name: "Depot / Home Base" };

const routeStops = [
  { id: 1, name: "Patia", orders: 5, distance: "2.1 KM", status: "Pending", lat: 20.3559, lng: 85.8148 },
  { id: 2, name: "KIIT Square", orders: 8, distance: "3.4 KM", status: "Pending", lat: 20.3547, lng: 85.8195 },
  { id: 3, name: "Sailashree Vihar", orders: 4, distance: "2.8 KM", status: "Pending", lat: 20.3489, lng: 85.8248 },
  { id: 4, name: "Chandrasekharpur", orders: 6, distance: "3.2 KM", status: "Pending", lat: 20.3400, lng: 85.8180 },
];

// Extended dummy data shown when "View All" is clicked
const allDeliveries = [
  ...routeStops,
  { id: 5, name: "Nayapalli", orders: 3, distance: "4.5 KM", status: "Delivered", lat: 20.3021, lng: 85.8172 },
  { id: 6, name: "Jaydev Vihar", orders: 7, distance: "3.9 KM", status: "Delivered", lat: 20.3010, lng: 85.8225 },
  { id: 7, name: "Rasulgarh", orders: 2, distance: "5.6 KM", status: "Pending", lat: 20.3082, lng: 85.8479 },
  { id: 8, name: "Damana", orders: 5, distance: "6.1 KM", status: "Delivered", lat: 20.3624, lng: 85.8288 },
];

const vehicleStock = {
  loaded: 120,
  delivered: 72,
  remaining: 48,
  emptyCollected: 69,
  damaged: 2,
};

const cashChartData = {
  Today: [
    { label: "9am", value: 4 },
    { label: "11am", value: 6 },
    { label: "1pm", value: 3 },
    { label: "3pm", value: 8 },
    { label: "5pm", value: 5 },
    { label: "7pm", value: 7 },
    { label: "9pm", value: 4 },
  ],
  "This Week": [
    { label: "Mon", value: 5 },
    { label: "Tue", value: 3 },
    { label: "Wed", value: 6 },
    { label: "Thu", value: 9 },
    { label: "Fri", value: 4 },
    { label: "Sat", value: 8 },
    { label: "Sun", value: 6 },
  ],
  "This Month": [
    { label: "W1", value: 6 },
    { label: "W2", value: 8 },
    { label: "W3", value: 5 },
    { label: "W4", value: 9 },
  ],
};

/* ------------------------------------------------------------------ */
/* Marker icons                                                        */
/* ------------------------------------------------------------------ */

const numberedIcon = (num) =>
  L.divIcon({
    className: "delivery-dashboard-map-marker",
    html: `<div class="delivery-dashboard-map-marker-inner">${num}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

const homeIcon = L.divIcon({
  className: "delivery-dashboard-map-marker",
  html: `<div class="delivery-dashboard-map-marker-inner delivery-dashboard-map-marker-home">🏠</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function DeliveryDashboard() {
  const [showAll, setShowAll] = useState(false);
  const [range, setRange] = useState("This Week");

  const routeLatLngs = [
    [homeBase.lat, homeBase.lng],
    ...routeStops.map((s) => [s.lat, s.lng]),
    [homeBase.lat, homeBase.lng],
  ];

  const chartData = cashChartData[range];
  const maxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="delivery-dashboard">
      {/* ---------------- Stats cards ---------------- */}
      <section className="delivery-dashboard-stats">
        {statsData.map((stat) => (
          <div className="delivery-dashboard-stat-card" key={stat.id}>
            <p className="delivery-dashboard-stat-label">{stat.label}</p>
            <p className={`delivery-dashboard-stat-value delivery-dashboard-stat-value--${stat.color}`}>
              {stat.value}
            </p>
            <p className="delivery-dashboard-stat-sub">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* ---------------- Main grid: Route + Deliveries ---------------- */}
      <section className="delivery-dashboard-main-grid">
        <div className="delivery-dashboard-panel delivery-dashboard-route-panel">
          <div className="delivery-dashboard-panel-header">
            <h2>Today's Route</h2>
            <button className="delivery-dashboard-icon-btn delivery-dashboard-close-btn" aria-label="Close">
              <FiX />
            </button>
          </div>
          <div className="delivery-dashboard-map-wrapper">
            <MapContainer
              center={[homeBase.lat, homeBase.lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="delivery-dashboard-map"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline
                positions={routeLatLngs}
                pathOptions={{ color: "#1652f0", weight: 4 }}
              />
              <Marker position={[homeBase.lat, homeBase.lng]} icon={homeIcon}>
                <Tooltip>{homeBase.name}</Tooltip>
              </Marker>
              {routeStops.map((stop) => (
                <Marker
                  key={stop.id}
                  position={[stop.lat, stop.lng]}
                  icon={numberedIcon(stop.id)}
                >
                  <Tooltip>{stop.name}</Tooltip>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="delivery-dashboard-panel delivery-dashboard-deliveries-panel">
          <div className="delivery-dashboard-panel-header">
            <h2>Today's Deliveries</h2>
          </div>
          <div className="delivery-dashboard-deliveries-list">
            {routeStops.map((stop) => (
              <div className="delivery-dashboard-delivery-row" key={stop.id}>
                <span className="delivery-dashboard-delivery-number">{stop.id}</span>
                <div className="delivery-dashboard-delivery-info">
                  <p className="delivery-dashboard-delivery-name">{stop.name}</p>
                  <p className="delivery-dashboard-delivery-orders">{stop.orders} Orders</p>
                </div>
                <span className="delivery-dashboard-delivery-distance">{stop.distance}</span>
                <span
                  className={`delivery-dashboard-badge delivery-dashboard-badge--${stop.status.toLowerCase()}`}
                >
                  {stop.status}
                </span>
              </div>
            ))}
          </div>
          <button
            className="delivery-dashboard-view-all"
            onClick={() => setShowAll(true)}
          >
            View All
          </button>
        </div>
      </section>

      {/* ---------------- Bottom grid: Stock + Cash chart ---------------- */}
      <section className="delivery-dashboard-bottom-grid">
        <div className="delivery-dashboard-panel delivery-dashboard-stock-panel">
          <h2>Vehicle Stock Summary</h2>
          <div className="delivery-dashboard-stock-numbers">
            <div className="delivery-dashboard-stock-item">
              <p className="delivery-dashboard-stock-label">Loaded</p>
              <p className="delivery-dashboard-stock-value">{vehicleStock.loaded} Jars</p>
            </div>
            <div className="delivery-dashboard-stock-item">
              <p className="delivery-dashboard-stock-label">Delivered</p>
              <p className="delivery-dashboard-stock-value delivery-dashboard-stock-value--green">
                {vehicleStock.delivered} Jars
              </p>
            </div>
            <div className="delivery-dashboard-stock-item">
              <p className="delivery-dashboard-stock-label">Remaining</p>
              <p className="delivery-dashboard-stock-value delivery-dashboard-stock-value--blue">
                {vehicleStock.remaining} Jars
              </p>
            </div>
            <div className="delivery-dashboard-stock-item">
              <p className="delivery-dashboard-stock-label">Empty Collected</p>
              <p className="delivery-dashboard-stock-value">{vehicleStock.emptyCollected} Jars</p>
            </div>
            <div className="delivery-dashboard-stock-item">
              <p className="delivery-dashboard-stock-label">Damaged</p>
              <p className="delivery-dashboard-stock-value delivery-dashboard-stock-value--red">
                {vehicleStock.damaged} Jars
              </p>
            </div>
          </div>
          <div className="delivery-dashboard-stock-bar">
            <div
              className="delivery-dashboard-stock-bar-segment delivery-dashboard-stock-bar-segment--blue"
              style={{ width: "40%" }}
            />
            <div
              className="delivery-dashboard-stock-bar-segment delivery-dashboard-stock-bar-segment--green"
              style={{ width: "25%" }}
            />
            <div
              className="delivery-dashboard-stock-bar-segment delivery-dashboard-stock-bar-segment--red"
              style={{ width: "20%" }}
            />
            <div
              className="delivery-dashboard-stock-bar-segment delivery-dashboard-stock-bar-segment--orange"
              style={{ width: "15%" }}
            />
          </div>
        </div>

        <div className="delivery-dashboard-panel delivery-dashboard-cash-panel">
          <div className="delivery-dashboard-panel-header">
            <h2>Cash Collection</h2>
            <div className="delivery-dashboard-select-wrapper">
              <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <FiChevronDown className="delivery-dashboard-select-chevron" />
            </div>
          </div>
          <div className="delivery-dashboard-chart">
            {chartData.map((d, i) => (
              <div className="delivery-dashboard-chart-col" key={d.label}>
                <div
                  className={`delivery-dashboard-chart-bar ${
                    i % 2 === 0 ? "delivery-dashboard-chart-bar--light" : "delivery-dashboard-chart-bar--dark"
                  }`}
                  style={{ height: `${(d.value / maxVal) * 100}%` }}
                  title={`${d.label}: ${d.value}`}
                />
                <span className="delivery-dashboard-chart-label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- View All modal ---------------- */}
      {showAll && (
        <div className="delivery-dashboard-modal-overlay" onClick={() => setShowAll(false)}>
          <div
            className="delivery-dashboard-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delivery-dashboard-panel-header">
              <h2>All Deliveries</h2>
              <button
                className="delivery-dashboard-icon-btn"
                onClick={() => setShowAll(false)}
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>
            <div className="delivery-dashboard-deliveries-list delivery-dashboard-deliveries-list--modal">
              {allDeliveries.map((stop) => (
                <div className="delivery-dashboard-delivery-row" key={stop.id}>
                  <span className="delivery-dashboard-delivery-number">{stop.id}</span>
                  <div className="delivery-dashboard-delivery-info">
                    <p className="delivery-dashboard-delivery-name">{stop.name}</p>
                    <p className="delivery-dashboard-delivery-orders">{stop.orders} Orders</p>
                  </div>
                  <span className="delivery-dashboard-delivery-distance">{stop.distance}</span>
                  <span
                    className={`delivery-dashboard-badge delivery-dashboard-badge--${stop.status.toLowerCase()}`}
                  >
                    {stop.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}