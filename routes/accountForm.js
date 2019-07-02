var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('accountForm', {title: 'Account registration'});
});
router.post('/', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    res.status(204).send(console.log(req.body));
});
module.exports = router;
