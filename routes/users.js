var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

//login route
router.post('/api/login', function(req, res, next){
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
router.post('/api/signup', function(req, res, next){
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


// Transaction routes

router.param('transaction', function(req, res, next, id){
  var query = Transaction.findById(id);

  query.exec(function (err, transaction){
    if(err){
      return next(err);
    }
    if(!transaction){
      return next(new Error('Couldnt find transaction'));
    }

    req.transaction = transaction;
    return next();
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
})

//get a transaction
router.get('/transactions/:transaction', function(req, res){
  res.json(req.transaction);
});

//add a new transaction for a user
router.post('/transactions/users/:user', function(req, res){
  console.log(req.body);
  var transaction = new Transaction(req.body);
  transaction.owner = req.user._id;
  transaction.save(function(err, transaction){
    if(err){
      return next(err);
    }
    req.user.transactions.push(transaction);
    req.user.save(function(err, post) {
    if(err){ return next(err); }
      res.json(transaction);
      console.log(transaction);
    });
  })
});

//Get all transactions for a user
router.get('/transactions/users/:user', function(req, res){
  req.user.populate('transactions', function(err, user) {
    if (err) { return next(err); }
    res.json(user.transactions);
  });
});
//
router.delete('/transactions/:transaction/users/:user', function(req, res){
  Transaction.findOneAndRemove({id: 'req.transaction._id'}, function(err){
    //update user array?
    //return
  });
});
module.exports = router;
