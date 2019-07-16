/**
 * ERS Main file
 * Contains initial setup such as modules to use, port declaration, 
 * server initialization. 
 * Modules:
 * @express Module used to create the communication with the server in order
 * to send/receive requests/responses.
 * @bodyParser Module used to convert a request body of type json to a JS 
 * object. 
 * Also import routers from corresponding files.
*/

import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
// This middleware is used to store the token of the person that logs in in order
// to check if has accesss to next routers
import checkToken from './util/check-token';
// Necessary middleware for the ERS application
import usersRouter from './routers/users-router';
import loginRouter from './routers/login-router';
import reimbRouter from './routers/reimbursements-router';

const expApp = express();
const port = 3006;

// Convert to javascript object
expApp.use(bodyParser.json());

// MIDDLEWARE
expApp.use((request:Request,response:Response,next)=>{
    next();
});

// Define the routers
// The first router is the login.
// Login router
expApp.use('/Login',loginRouter);
// After the login is complete, access to information is reviewed by
// checking the current user info.

// Users router
// checkToken is the middleware that passes to posterior middlewares the current user token
// The token contains the user's id an roleId
expApp.use('/Users',checkToken,usersRouter);
// Reimbursements router (check by status)
expApp.use('/Reimbursements',checkToken,reimbRouter);
// Reimbursements router (check by author)

// Start the server
expApp.listen(port,() => {
    console.log("Starting on port",port);
});