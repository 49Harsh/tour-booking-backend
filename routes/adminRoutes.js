const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', adminController.login);
router.post('/packages', adminAuth, adminController.createPackage);
router.put('/packages/:id', adminAuth, adminController.updatePackage);
router.delete('/packages/:id', adminAuth, adminController.deletePackage);

module.exports = router;