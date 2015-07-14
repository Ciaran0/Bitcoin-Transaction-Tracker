var mongoose = require('mongoose');
var User = mongoose.model('User');

var TransactionSchema = new mongoose.Schema({
  amount: Number,
  //alertHigh: Number,
  //alertLow: Number,
  //alert: Boolean,
  //date: Date,
  //weekValue: [Number],
  _owner: { type: Number, ref: 'User' }
});

mongoose.model('Transaction', TransactionSchema);
