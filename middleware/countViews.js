const AccessLog = require("../models/AccessLogmodel");

const countViewsMiddleware = async (req, res, next) => {
    const accessLogId = req.accessLogId;
  
    try {
      await AccessLog.findByIdAndUpdate(accessLogId, { $inc: { views: 1 } });
      next();
    } catch (error) {
      console.error('Error counting views:', error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = AccessLog