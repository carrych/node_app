var express = require('express');
var router = express.Router();
var Page = require('../models/page.model');
var assert = require('assert');


/* GET home page. */
router.get('/', function (req, res, next) {
    Page.findOne({title: 'about'})
        .then((page, err) => {
            assert.equal(null, err);
            res.render('about', {title: page.title, content: page.content});
        })
        .catch(err => console.log(err));
});

module.exports = router;
