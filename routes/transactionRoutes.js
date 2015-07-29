var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');

var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

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
});

//edit a transaction
router.put('/:transaction', function(req, res, next){
  Transaction.findOneAndUpdate({'_id': req.transaction._id},  {
      'buyValue': req.body.buyValue,
      'amount': req.body.amount
  },{new: true}, function(err, updatedTransaction) {
    if(!updatedTransaction){
      return next(err);
    }
    updatedTransaction.save();
    res.json(updatedTransaction);
  });
});

//Get all transactions for a user
router.get('/users/:user', auth, function(req, res){
  req.user.populate('transactions', function(err, user) {
    if (err) { return next(err); }
    res.json(user.transactions);
  });
});

//delete a transaction
router.delete('/:transaction/users/:user', auth, function(req, res, next){
  Transaction.findOneAndRemove({id: 'req.transaction._id'}, function(err){
      return next(err);
  });
  req.user.transactions.pull(req.transaction);
  req.user.save();
  res.json({message: 'Transaction Deleted'});
});

//add a new transaction for a user
router.post('/users/:user', auth, function(req, res, next){
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
    });
  })
});


module.exports = router;
