const express = require('express');
const HealthController = require('../controllers/health.controller');
const SomeController = require('../controllers/some.controller');

const router = express.Router();

// register controllers
const healthController = new HealthController();
healthController.register(router);

const someController = new SomeController();
someController.register(router);



module.exports = router;
