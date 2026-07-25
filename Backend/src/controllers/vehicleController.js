const Vehicle = require('../models/vehicle');

// @desc    Get all vehicles
// @route   GET /api/vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register a new vehicle
// @route   POST /api/vehicles
exports.createVehicle = async (req, res) => {
  try {
    const { number, driver, capacity, status } = req.body;

    if (!number || !driver || !capacity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide vehicle number, driver name, and capacity.' 
      });
    }

    // Auto-append 'Bottles' to capacity if not included
    const formattedCapacity = capacity.toLowerCase().includes('bottles')
      ? capacity
      : `${capacity} Bottles`;

    const vehicleExists = await Vehicle.findOne({ number });
    if (vehicleExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'A vehicle with this number already exists.' 
      });
    }

    const vehicle = await Vehicle.create({
      number,
      driver,
      capacity: formattedCapacity,
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update vehicle status or details
// @route   PUT /api/vehicles/:id
exports.updateVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedVehicle
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Export vehicles to CSV
// @route   GET /api/vehicles/export-csv
exports.exportVehiclesCSV = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    const headers = ['Vehicle No.', 'Driver', 'Capacity', 'Status'];
    const rows = vehicles.map(v => [
      `"${v.number}"`,
      `"${v.driver}"`,
      `"${v.capacity}"`,
      `"${v.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="Vehicle_Management_Report.csv"');
    
    // Include UTF-8 BOM so Excel opens special characters correctly
    return res.status(200).send('\ufeff' + csvContent);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};