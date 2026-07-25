const DeliveryPartner = require("../models/delivery");

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
    return res.status(500).json({ success: false, message: 'Server error while fetching delivery partners' });
  }
};

// CREATE DELIVERY PARTNER
exports.createDeliveryPartner = async (req, res) => {
  try {
    const { name, phone, aadharNo, email, address, salary, password } = req.body;

    if (!name || !phone || !aadharNo || !email || !address || !salary || !password) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const profileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0].filename : null;
    const offerLetter = req.files && req.files['offerLetter'] ? req.files['offerLetter'][0].filename : null;

    if (!profileImage) {
      return res.status(400).json({ success: false, message: 'Profile image is required' });
    }

    const newPartner = await DeliveryPartner.create({
      name,
      phone,
      aadharNo,
      email,
      address,
      salary,
      password,
      profileImage,
      offerLetter
    });

    return res.status(201).json({
      success: true,
      message: 'Delivery partner registered successfully',
      data: newPartner
    });
  } catch (error) {
    console.error('Create Delivery Partner Error:', error);
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
      return res.status(404).json({ success: false, message: 'Delivery partner not found' });
    }

    const updateFields = {
      name: name || partner.name,
      phone: phone || partner.phone,
      aadharNo: aadharNo || partner.aadharNo,
      email: email || partner.email,
      address: address || partner.address,
      salary: salary || partner.salary
    };

    if (password && password.trim() !== '') {
      updateFields.password = password;
    }

    if (req.files && req.files['profileImage']) {
      updateFields.profileImage = req.files['profileImage'][0].filename;
    }

    if (req.files && req.files['offerLetter']) {
      updateFields.offerLetter = req.files['offerLetter'][0].filename;
    }

    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

    return res.status(200).json({
      success: true,
      message: 'Delivery partner updated successfully',
      data: updatedPartner
    });
  } catch (error) {
    console.error('Update Delivery Partner Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE DELIVERY PARTNER
exports.deleteDeliveryPartner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPartner = await DeliveryPartner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({ success: false, message: 'Delivery partner not found' });
    }

    return res.status(200).json({ success: true, message: 'Delivery partner deleted successfully' });
  } catch (error) {
    console.error('Delete Delivery Partner Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};