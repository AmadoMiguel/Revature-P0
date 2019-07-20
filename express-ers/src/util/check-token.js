"use strict";
// Code taken and adapted from: https://github.com/narenaryan/node-jwt-integ
exports.__esModule = true;
var jwt = require('jsonwebtoken');
var checkToken = function (req, res, next) {
    // Get the token from postman, contained in the headers of the request
    var token = req.headers['authorization']; // Express headers are auto converted to lowercase
    // Check if the token was provided in the request headers
    if (token) {
        // Check if the token is correct
        jwt.verify(token, "thisIsTheSecret", function (err, info) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Wrong personal token provided'
                });
            }
            else {
                // Every time the user requests something, will send his token (secret identifier)
                // in order to inform the server about her/his role
                req.token = info;
                // It goes to the next middleware in the "chain".
                // It could be Users or Reimbursement.
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            success: "false",
            message: "No token provided. Login first"
        });
    }
};
// Export module to be used as middleware
exports["default"] = checkToken;
