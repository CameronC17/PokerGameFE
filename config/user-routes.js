var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

//Create
// router.route('/users')
//     .post(users.create);

//New
router.route('/users/register')
    .get(users.new);

router.route('/users/login')
    .get(users.login);

module.exports = router;
