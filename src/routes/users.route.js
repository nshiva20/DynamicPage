const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middlewares/authCheck.middleware');

router.get('/accessResource', auth.get);

router.get('/details', auth.get, userController.get);

router.post('/login', userController.login);
  
router.post('/signUp', userController.create);

router.put('/:id', userController.update);

router.patch('/resetPassword', userController.resetPassword);

router.delete('/:id', userController.remove);

module.exports = router;
