var mongoose = require('mongoose');
var User = mongoose.model('User');

var TransactionSchema = new mongoose.Schema({
  amount: {type: Number, required: true},
  buyValue: {type: Number, required: true},
  //alertHigh: Number,
  //alertLow: Number,
  alert: { type: Boolean , default: false },
  date: Date,
  weekValue: [Number],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Transaction', TransactionSchema);
