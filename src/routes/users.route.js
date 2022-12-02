const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../middlewares/authCheck.middleware');

router.get('/accessResource', auth.get);

router.get('/details', auth.get, userController.get);

router.post('/login', userController.login);

router.post('/signUp', userController.create);

router.put('/resetPassword', userController.resetPassword);

module.exports = router;
