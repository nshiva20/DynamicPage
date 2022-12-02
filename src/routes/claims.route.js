const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claims.controller');
const auth = require('../middlewares/authCheck.middleware');

router.put('/registerClaim', auth.get, claimsController.update);

module.exports = router;
