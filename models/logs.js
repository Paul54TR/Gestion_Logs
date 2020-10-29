//  Logs[id, account_id, event, date_at]
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    accountId: {type: Number },
    event: {type: String , enum: ['create','withdraw','deposit']  },
    date_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);


