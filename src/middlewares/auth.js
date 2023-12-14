const jwt = require("jsonwebtoken");
const { SESSION_SECRET } = require('../config')


const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({ message: "A token is required for authentication" })
    }
    try {
      const decoded = jwt.verify(token, SESSION_SECRET);
      req.vendor = decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" })
    }
    return next();
  };
  
  module.exports = verifyToken;