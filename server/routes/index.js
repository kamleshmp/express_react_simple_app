var models  = require('../models');
var express = require('express');
var router  = express.Router();
var contacts = require('./contacts');
var messages = require('./messages');

router.use('/contacts', contacts);
router.use('/messages', messages);

module.exports = router;
