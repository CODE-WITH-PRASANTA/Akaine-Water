const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, 'Vehicle number is required'],
      trim: true,
      unique: true
    },
    driver: {
      type: String,
      required: [true, 'Driver name is required'],
      trim: true
    },
    capacity: {
      type: String,
      required: [true, 'Capacity is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Maintenance'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);