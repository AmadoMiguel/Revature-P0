// Import express module
import express,{Request,Response} from 'express';
// Import the login service file
import * as loginService from '../services/login-service';

// Create a router
const loginRouter = express.Router();

// Define POST method to return user given its credentials
// Define the current user info as a var, so it can be called outside
// within all scopes.

loginRouter.post('',async (request:Request,response:Response)=>{
    // Credentials taken from the request body (written in json from postman)
    const cred = request.body;
    // Retrieve both username and password from the request
    const usr = cred["username"];
    const pass = cred["password"];
    // Assign query result to a variable and check if any user returned
    const loginResult = await loginService.userLogin(usr,pass);
    // If any user found with given credentials...
    if (loginResult) {
        // ...create a token with part of the user info
        const token = loginService.setTokenWithUserInfo(loginResult);
        // ...and send it to the client so he/her can send it back to idendify her/himself
        // and let the server know if she/he has access to other routers.
        response.status(201).json([loginResult,token]);
    }
    // No user found with given credentials 
    else { 
        response.status(400).json(
            {
            message:'Invalid credentials'
            }
        );
    }
});

export default loginRouter;