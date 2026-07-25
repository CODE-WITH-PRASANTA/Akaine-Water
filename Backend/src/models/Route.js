const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  coords: {
    type: [Number], // [Latitude, Longitude]
    required: true
  }
});

const RouteSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Bhubaneswar Central Route' },
    hubCoords: {
      type: [Number],
      default: [20.3050, 85.8280] // Base Hub
    },
    stops: [StopSchema],
    totalDistance: { type: Number, required: true, default: 0 },
    estimatedTime: { type: String, default: '0m' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Route', RouteSchema);