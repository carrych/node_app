var express = require('express');
var passport = require('passport');
var router = express.Router();
//var faker = require('faker');
var Product = require('./../models/product.model');

var logger = function (req, res, next) {
    console.info(req.params);
    next();
};

router.use(passport.authenticate('jwt', { session: false }));

/* GET product page. */
router.get('/', function (req, res, next) {
    Product.find({}, function (err, products) {
        if (err) {
            return next(err);
        }
        res.status(200).send(products);
    });
});
//
router.get('/:id', function (req, res, next) {
    Product.findOne({_id: req.params.id}, function (err, product) {
        if (err) {
            return next(err);
        }
        res.status(200).send(product);
    });
});

router.post('/', function (req, res) {
    var product = new Product(req.body);
    product.save(function (err) {
        if (err) {
            res.status(500).json(err);
        }
        else res.status(201).send(product);//sozdalu i vernylu obekt
    });


});

router.delete('/:id', logger, function (req, res) {
    Product.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            return next(err);
        }
        res.status(204).send(console.info('Done'));
    });

});

router.use(function (err, req, res, next) {
    console.error(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});

module.exports = router;
