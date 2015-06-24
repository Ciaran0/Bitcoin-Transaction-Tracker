var mongoose = require('mongoose');
var TransactionSchema = new mongoose.Schema({
  buyAmount: Number,
  alertHigh: Number,
  alertLow: Number,
  alert: Boolean,
  date: Date,
  weekValue, [Number],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Transaction', TransactionSchema);
