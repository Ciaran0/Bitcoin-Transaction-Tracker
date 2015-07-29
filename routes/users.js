var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

//login route
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

//signup/register route
router.post('/signup', function(req, res, next){
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

router.param('user', function(req,res,next,id){
  var query = User.findById(id);

  query.exec(function (err, user){
    if(err){
      return next(err);
    }
    if(!user){
      return next(new Error('Couldnt find user'));
    }
    req.user = user;
    return next();
  });
});


module.exports = router;
