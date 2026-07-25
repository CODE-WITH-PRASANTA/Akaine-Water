const DeliveryPartner = require("../models/delivery");
const bcrypt = require("bcryptjs");

// GET ALL DELIVERY PARTNERS
exports.getAllDeliveryPartners = async (req, res) => {
  try {
    const partners = await DeliveryPartner.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: partners
    });
  } catch (error) {
    console.error('Get Delivery Partners Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching delivery partners' 
    });
  }
};

// CREATE DELIVERY PARTNER
exports.createDeliveryPartner = async (req, res) => {
  try {
    const { name, phone, aadharNo, email, address, salary, password } = req.body;

    // Validate required fields
    if (!name || !phone || !aadharNo || !email || !address || !salary || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be provided' 
      });
    }

    // Check existing email explicitly before hitting DB constraint
    const existingPartner = await DeliveryPartner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ 
        success: false, 
        message: 'Delivery partner with this email already exists' 
      });
    }

    // Safely parse uploaded files
    const profileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0].filename : null;
    const offerLetter = req.files && req.files['offerLetter'] ? req.files['offerLetter'][0].filename : null;

    if (!profileImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Profile image is required' 
      });
    }

    // Save to Database
    const newPartner = await DeliveryPartner.create({
      name,
      phone,
      aadharNo,
      email,
      address,
      salary: Number(salary), // Explicit numeric cast
      password,
      profileImage,
      offerLetter
    });

    const partnerResponse = newPartner.toObject();
    delete partnerResponse.password;

    return res.status(201).json({
      success: true,
      message: 'Delivery partner registered successfully',
      data: partnerResponse
    });
  } catch (error) {
    console.error('Create Delivery Partner Error:', error);

    // Catch MongoDB Duplicate Key Error (Code 11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `A partner with this ${duplicateField} already exists.`
      });
    }

    // Catch Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN DELIVERY PARTNER
exports.loginDeliveryPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    const partner = await DeliveryPartner.findOne({ email }).select('+password');

    if (!partner) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await partner.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const partnerData = partner.toObject();
    delete partnerData.password;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: partnerData
    });
  } catch (error) {
    console.error('Login Delivery Partner Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE DELIVERY PARTNER
exports.updateDeliveryPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, aadharNo, email, address, salary, password } = req.body;

    const partner = await DeliveryPartner.findById(id);
    if (!partner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Delivery partner not found' 
      });
    }

    // Assign text fields if provided
    if (name) partner.name = name;
    if (phone) partner.phone = phone;
    if (aadharNo) partner.aadharNo = aadharNo;
    if (email) partner.email = email;
    if (address) partner.address = address;
    if (salary) partner.salary = Number(salary);

    // Update password only if a new non-empty password is entered
    if (password && password.trim() !== '') {
      partner.password = password; 
    }

    // Update files if new ones are uploaded
    if (req.files && req.files['profileImage']) {
      partner.profileImage = req.files['profileImage'][0].filename;
    }

    if (req.files && req.files['offerLetter']) {
      partner.offerLetter = req.files['offerLetter'][0].filename;
    }

    const updatedPartner = await partner.save();
    const responseData = updatedPartner.toObject();
    delete responseData.password;

    return res.status(200).json({
      success: true,
      message: 'Delivery partner updated successfully',
      data: responseData
    });
  } catch (error) {
    console.error('Update Delivery Partner Error:', error);

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `A partner with this ${duplicateField} already exists.`
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE DELIVERY PARTNER
exports.deleteDeliveryPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Delivery partner not found' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Delivery partner deleted successfully' 
    });
  } catch (error) {
    console.error('Delete Delivery Partner Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};