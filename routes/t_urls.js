const express = require('express');
const UserController = require('../controllers/UserController');
const tweetController = require('../controllers/tweetController');

const router = express.Router();

// register controllers
const userController = new UserController();
userController.register(router);

const tweetsController = new tweetController();
tweetsController.register(router);





module.exports = router;
