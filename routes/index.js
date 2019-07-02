var express = require('express');
var router = express.Router();
var Page = require('../models/page.model');
var assert = require('assert');

/* GET home page. */
router.get('/', function (req, res, next) {
    Page.findOne({title: 'index'})
        .then((page, err) => {
            if (!page)
                res.render('index', {title: 'First app', text: ''});

            assert.equal(null, err);
            res.render('index', {title: 'First app', content: page.content});
        })
        .catch(err => console.log(err));
});

module.exports = router;
