const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins.controller');
const auth = require('../middlewares/authCheck.middleware');

router.get('/details', auth.get, adminController.get);

router.get('/userDetails', auth.get, adminController.getUserDetails);

router.put('/updateStatus', auth.get, adminController.updateStatus);

module.exports = router;