var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

require('./models/Users');
require('./config/passport');

var User = mongoose.model('User');


mongoose.connect('mongodb://localhost/bi')


var app = express();

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


//place routes in seperate files
//app.use('/users', users);

//login route
app.post('/api/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  console.log(req.payload);

  passport.authenticate('local', function(err, user, info){
    console.log(user);
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

//signup/register route
app.post('/api/signup', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

//redirect url. Should be last route
app.get('*', function(req, res) {
  console.log("redirecting");
  res.redirect('/#' + req.originalUrl);
});



//error handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  //res.send(500, { message: err.message });
  res.status(500).send(err.message)
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
