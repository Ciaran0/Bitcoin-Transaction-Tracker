var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var jwt = require('express-jwt');
var nodemailer = require('nodemailer');
var async = require('async');
var config = require('config');

var secret = config.get('auth.secret');
var auth = jwt({secret: secret, userProperty: 'payload'});

require('./models/Users');
require('./models/Transactions');
require('./config/passport');
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');

var dbUrl = config.get('dbConfig.url');
mongoose.connect(dbUrl);
//mongoose.connect('mongodb://localhost/bi')
var app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
//app.use(express.static(path.join(__dirname, 'bower_components'), { maxAge: 86400000 }));
app.use(passport.initialize());

app.use('/users', require('./routes/users'));
app.use('/transactions', require('./routes/transactionRoutes'));

//redirect url. Should be last route
app.get('*', function(req, res) {
  console.log("redirecting");
  res.redirect('/#' + req.originalUrl);
});

//error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message)
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
