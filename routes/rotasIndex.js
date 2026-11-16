var express = require('express');
var router = express.Router();
var controller = require('../controller/controllerOficina.js');

router.get('/', controller.home);
module.exports = router;