'use strict';

var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/calendar', function(req, res, next) {
    res.render('calendar', {
        title: 'React calendar'
    });
});

router.post('/submitdetails', function(req, res, next) {
    res.status(200).send({
        key: 'Details submitted successfully'
    });
});

router.get('/countries', function(req, res, next) {
    var countries = [{
        name: 'Afghanistan',
        code: 'AF'
    }, {
        name: 'Åland Islands',
        code: 'AX'
    }, {
        name: 'Albania',
        code: 'AL'
    }, {
        name: 'Algeria',
        code: 'DZ'
    }, {
        name: 'American Samoa',
        code: 'AS'
    }, {
        name: 'AndorrA',
        code: 'AD'
    }, {
        name: 'Angola',
        code: 'AO'
    }, {
        name: 'Anguilla',
        code: 'AI'
    }, {
        name: 'Antarctica',
        code: 'AQ'
    }, {
        name: 'Antigua and Barbuda',
        code: 'AG'
    }, {
        name: 'Argentina',
        code: 'AR'
    }, {
        name: 'Armenia',
        code: 'AM'
    }, {
        name: 'Aruba',
        code: 'AW'
    }, {
        name: 'Australia',
        code: 'AU'
    }, {
        name: 'Austria',
        code: 'AT'
    }, {
        name: 'Azerbaijan',
        code: 'AZ'
    }, {
        name: 'Bahamas',
        code: 'BS'
    }, {
        name: 'Bahrain',
        code: 'BH'
    }, {
        name: 'Bangladesh',
        code: 'BD'
    }, {
        name: 'Barbados',
        code: 'BB'
    }, {
        name: 'Belarus',
        code: 'BY'
    }, {
        name: 'Belgium',
        code: 'BE'
    }, {
        name: 'Belize',
        code: 'BZ'
    }, {
        name: 'Benin',
        code: 'BJ'
    }, {
        name: 'Bermuda',
        code: 'BM'
    }, {
        name: 'Bhutan',
        code: 'BT'
    }, {
        name: 'Bolivia',
        code: 'BO'
    }, {
        name: 'Bosnia and Herzegovina',
        code: 'BA'
    }, {
        name: 'Botswana',
        code: 'BW'
    }, {
        name: 'Bouvet Island',
        code: 'BV'
    }];

    return res.status(200).send(_.filter(countries, function(obj) {
        return obj.name.toLowerCase().indexOf(req.query['search']) > -1;
    }));

});

module.exports = router;