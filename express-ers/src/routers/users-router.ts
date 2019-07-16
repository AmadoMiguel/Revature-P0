import express, {Request, Response} from 'express';
// Import the current user info to know his/her role and determine
// if he/she has access to users information
import * as userServices from '../services/users-service';
import User from 'models/User';

// Create a new router
const usersRouter = express.Router();

// First, roleId from actual user has to be checked to 
// allow/deny access. Or, if the id of the current user
// matches the searched id.

// Get all users
usersRouter.get('',async (request:any,response:Response)=>{
    // Call the function at userServices to retrieve all users info from
    // the database
    // The current user's role is provided in order to check access permission
    // using the token
    const allUsers = await userServices.getAllUsers(parseInt(request.token.role));
    if (allUsers) { // Access accepted
        if (allUsers.length === 0) { // No users registered yet
            response.sendStatus(404);
        } else {
            response.status(200).json(allUsers); // Shows all users
        }
    } else {
        response.sendStatus(403); // Access forbidden
    }
});

// Get user with specific id
usersRouter.get('/:id',async (request:any,response:Response)=>{
    // Parse id from url parameter
    const id = parseInt(request.params.id);
    // Send query to database
    // The current  user's role is provided in order to check access permission
    const user = await userServices.getUserById(id,request.token);
    if (user) { // Access accepted
        if (user.length === 0) { // No users found with given id
            response.sendStatus(404);
        } else {
            response.status(200).json(user); // Shows user with given id
        }
    } else {
        response.sendStatus(403); // Access forbidden
    }
});

// Patch method to update determined user information, according to the body 
// request info
usersRouter.patch('',async (request:any,response:Response) => {
    const patch : User = request.body;
    // The roleId of the current user logged in is passed through the token
    const patchedUser = await userServices.changeUserInfo(patch,parseInt(request.token.role));
    if (patchedUser) { // Access accepted
        if (patchedUser.length === 0) { // Could not find user with id provided in the request body
            response.sendStatus(404);
        } else {
            response.status(200).json(patchedUser); // Shows modified info from user
        }
    } else { 
        response.sendStatus(403); // Access forbidden
    }
});

export default usersRouter; 