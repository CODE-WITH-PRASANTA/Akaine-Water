const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = require('../middleware/multer');
const { 
  getAllDeliveryPartners, 
  createDeliveryPartner, 
  updateDeliveryPartner, 
  deleteDeliveryPartner 
} = require('../controllers/deliveryController');

const cpUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'offerLetter', maxCount: 1 }
]);

// Wrapper middleware to safely handle Multer errors without crashing Node
const handleUpload = (req, res, next) => {
  cpUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// Route definitions
router.route('/')
  .get(getAllDeliveryPartners)
  .post(handleUpload, createDeliveryPartner);

router.route('/:id')
  .put(handleUpload, updateDeliveryPartner)
  .delete(deleteDeliveryPartner);

module.exports = router;