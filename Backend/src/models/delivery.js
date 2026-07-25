const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    aadharNo: {
      type: String,
      required: [true, 'Aadhaar number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    profileImage: {
      type: String,
      default: null
    },
    offerLetter: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);