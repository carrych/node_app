var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./configs/mongo');

var passport = require('passport');
require('./configs/passport.config')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/products');
var accountFormRouter = require('./routes/accountForm');
var successRouter = require('./routes/success');

var app = express();

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/accountForm', accountFormRouter);
app.use('/success', successRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
