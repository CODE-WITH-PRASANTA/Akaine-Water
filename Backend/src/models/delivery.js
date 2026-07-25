const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      lowercase: true,
      unique: true
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
      required: [true, 'Password is required'],
      select: false // Hides password field from query results by default
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

// Hash password before saving if modified or newly created
deliveryPartnerSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper method to compare entered password with hashed password
deliveryPartnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);