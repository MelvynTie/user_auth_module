var jwt = require('jsonwebtoken');
var config = require('../config');

const path = require('path');

const verifyToken = (req, res, next) => {
  console.log("help");
  var token = req.headers['x-json-web-token'];
  if (!token) {
    res.status(403);
    console.log('No token was provided.');
  } else {
    jwt.verify(token, config.secretKey, (error, decoded) => { // jwt.verify(token, secretOrPublicKey, [options, callback])
      if (error) {
        res.status(500);
        console.log('Failure to verify the token.');
      } else {
        req.token = token;
        req.decoded = decoded;
        next();
      };
    });
  };
};

module.exports = verifyToken;
