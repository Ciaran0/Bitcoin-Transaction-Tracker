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

// Forgot password routes

router.post('/reset', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return next(new Error('Couldnt find user'));
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@bitcointracker.io',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.json({message: 'Reset email sent'});
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return next(new Error('Password reset token is invalid or has expired.'));
    }
    res.json({message: 'Token valid'});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return next(new Error('Password reset token is invalid or has expired.'));
        }
        user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function (err){
          if(err){ return next(err); }

          return res.json({token: user.generateJWT()})
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: '!!! YOUR SENDGRID USERNAME !!!',
          pass: '!!! YOUR SENDGRID PASSWORD !!!'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.json({message: 'Password has been successfully reset'});
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

//end of forgot password routes

//get a transaction
router.get('/transactions/:transaction', function(req, res){
  res.json(req.transaction);
});

//edit a transaction
router.put('/transactions/:transaction', function(req, res, next){
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
router.get('/transactions/users/:user', auth, function(req, res){
  req.user.populate('transactions', function(err, user) {
    if (err) { return next(err); }
    res.json(user.transactions);
  });
});

//delete a transaction
router.delete('/transactions/:transaction/users/:user', auth, function(req, res, next){
  Transaction.findOneAndRemove({id: 'req.transaction._id'}, function(err){
      return next(err);
  });
  req.user.transactions.pull(req.transaction);
  req.user.save();
  res.json({message: 'Transaction Deleted'});
});

//add a new transaction for a user
router.post('/transactions/users/:user', auth, function(req, res, next){
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
