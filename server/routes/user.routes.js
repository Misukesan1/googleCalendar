const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/create-user', userController.createNewUser);

module.exports = router;