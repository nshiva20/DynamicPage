const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claims.controller');
const auth = require('../middlewares/authCheck.middleware');

router.get('/', claimsController.get);
  
router.post('/', claimsController.create);

router.put('/:id', claimsController.update);

router.delete('/:id', claimsController.remove);

router.post('/registerClaim', auth.get, claimsController.update);

module.exports = router;
