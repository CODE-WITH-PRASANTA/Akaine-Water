const express = require('express');
const router = express.Router();
const {
  getVehicles,
  createVehicle,
  updateVehicleStatus,
  deleteVehicle,
  exportVehiclesCSV
} = require('../controllers/vehicleController');

// Export route (placed before /:id to avoid ID conflict)
router.get('/export-csv', exportVehiclesCSV);

// Base route: GET all vehicles / POST new vehicle
router.route('/')
  .get(getVehicles)
  .post(createVehicle);

// Single vehicle routes: PUT update / DELETE vehicle
router.route('/:id')
  .put(updateVehicleStatus)
  .delete(deleteVehicle);

module.exports = router;