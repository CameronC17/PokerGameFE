var express = require('express');
var router = express.Router();
var statics = require('../controllers/statics.js');

//Homepage / Create
router.route('/')
    .get(statics.index);

module.exports = router;
