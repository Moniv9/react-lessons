'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/submitdetails', function(req, res, next) {
    res.status(200).send({
        key: 'Details submitted successfully'
    });
});

module.exports = router;