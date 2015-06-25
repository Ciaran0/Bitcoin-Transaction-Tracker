var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');

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
    if(!transaction){
      return next(new Error('Couldnt find user'));
    }

    req.user = user;
    return next();
  });
})

router.get('/transactions/:transaction', function(req, res){
  res.json(req.transaction);
});

router.post('transactions/users/:user', function(req, res){
  var transaction = new Transaction(req.body);
  transaction.user = req.user;

  transaction.save(function(err, transaction){
    if(err){
      return next(err);
    }

    res.json(transaction)
  })
});


module.exports = router;
