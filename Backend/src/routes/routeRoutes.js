const express = require('express');
const router = express.Router();
const {
  getActiveRoute,
  postRoute,
  addStop,
  deleteStop
} = require('../controllers/routeController');

// Route API Endpoints
router.get('/active', getActiveRoute);
router.post('/', postRoute);
router.post('/add-stop', addStop);
router.delete('/stop/:stopId', deleteStop);

module.exports = router;