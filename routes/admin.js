var express = require('express');
var assert = require('assert');
var router = express.Router();
var Page = require('../models/page.model');
var bodyParser = require('body-parser').json();
var mongoose = require('mongoose');

router.get('/', function (req, res, next) {

    Page
        .find({}, function (err, data) {
            var tempArr = [];
            assert.equal(null, err);
            data.forEach(page => tempArr.push(page));
        })
        .then(tempArr => res.render('admin', {title: 'Admin', items: tempArr}));
});

router.post('/', (req, res) => {

    if ((!req.body.title || !req.body.content) && !req.body.id) {
        res.render('success', {title: 'Admin', msg: 'Please pass correct data.'})
    }
    else if ((!req.body.title || !req.body.content) && req.body.id) {
        Page.deleteOne({"_id": mongoose.mongo.ObjectId(req.body.id)}, function (err, result) {
            assert.equal(null, err);
            res.render('success', {title: 'Admin', msg: 'Successfully deleted.'})
        })
    }
    else if ((req.body.title && req.body.content) && !req.body.id) {
        console.log(req.body);

        Page.findOne({title: req.body.title})
            .then((page) => {

                if (!page) {
                    const newPage = new Page({
                        _id: mongoose.mongo.ObjectId(),
                        title: req.body.title,
                        content: req.body.content
                    });

                    newPage
                        .save()
                        .then(() => res.render('success', {title: 'Admin', msg: 'Successfully created.'}))
                        .catch(err => console.log(err));
                }
                else {

                    const item = {
                        content: req.body.content
                    };

                    Page.updateOne({"title": page.title}, {$set: item}, (err) => {
                        assert.equal(null, err);
                        console.log('item updated');
                    });
                    res.render('success', {title: 'Admin', msg: 'Successful updated page content.'})
                }
            })
            .catch(err => console.log(err));
    }
});

module.exports = router;
