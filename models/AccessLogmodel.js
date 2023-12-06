const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  ipAddress: String,
  timestamp: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const AccessLog = mongoose.model('AccessLog', accessLogSchema);

module.exports = AccessLog;