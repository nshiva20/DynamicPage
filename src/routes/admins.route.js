const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins.controller');
const auth = require('../middlewares/authCheck.middleware');

router.get('/details', adminController.get);
router.get('/getUser', adminController.getUser);
router.get('/userDetails', auth.get, adminController.getUserDetails);
router.patch('/:id', adminController.update);

module.exports = router;