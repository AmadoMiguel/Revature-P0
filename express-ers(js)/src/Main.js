"use strict";
/**
 * ERS Main file
 * Contains initial setup such as modules to use, port declaration,
 * server initialization.
 * Modules:
 * @express Module used to create the REST API.
 * @bodyParser Module used to convert a request body of type json to a JS
 * object.
 * Also import routers from corresponding files.
*/
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
// This middleware is used to store the token of the person that logs in in order
// to check if has accesss to next routers
var check_token_1 = require("./util/check-token");
// Necessary middleware for the ERS application
var users_router_1 = require("./routers/users-router");
var login_router_1 = require("./routers/login-router");
var reimbursements_router_1 = require("./routers/reimbursements-router");
var expApp = express_1();
var port = 3006;
// Convert to javascript object
expApp.use(body_parser_1.json());
// MIDDLEWARE
expApp.use(function (request, response, next) {
    next();
});
// Define the routers
// The first router is the login.
// Login router
expApp.use('/Login', login_router_1["default"]);
// After the login is complete, access to information is reviewed by
// checking the current user info.
// Users router
// checkToken is the middleware that passes to posterior middlewares the current user token
// The token contains the user's id an roleId
expApp.use('/Users', check_token_1["default"], users_router_1["default"]);
// Reimbursements router (check by status)
expApp.use('/Reimbursements', check_token_1["default"], reimbursements_router_1["default"]);
// Reimbursements router (check by author)
// Start the server
expApp.listen(port, function () {
    console.log("Starting on port", port);
});
