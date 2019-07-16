import express, {Request, Response} from 'express';
import * as reimbService from '../services/reimbursements-services';
import Reimbursement from '../models/Reimbursement';

// Create the reimbursement router 
const reimbRouter = express.Router();

// Add the logic including access permission like in users service
reimbRouter.get('/status/:statusId',async (request:any,response:Response) => {
    const statId : number = parseInt( request.params.statusId );
    // Get the roleId of the current user from the request
    const userRole : number = parseInt(request.token.role);
    const reimbursements = await reimbService.getReimbByStatusId(statId,userRole);
    if (reimbursements) { // Access accepted
        if (reimbursements.length === 0) { // No reimbursements found with provided statusId
            response.sendStatus(404);
        } else {
            response.status(200).json(reimbursements); // Show found reimbursements
        }
    } else { 
        response.sendStatus(403); // Access forbidden
    }
});

// Add the logic including access permission like in users service
reimbRouter.get('/author/:authorId', async (request:any,response:Response) => {
    const authorId : number = parseInt( request.params.authorId );
    // Get the roleId of the current user from the request
    const userRole : number = parseInt(request.token.role);
    const reimbursements = await reimbService.getReimbByAuthorId(authorId,userRole);
    // If any reimbursement(s) found with that authorId
    if (reimbursements) { // Access accepted
        if (reimbursements.length === 0) { // No reimbursements found with provided statusId
            response.sendStatus(404);
        } else {
            response.status(200).json(reimbursements); // Show found reimbursements
        }
    } else { 
        response.sendStatus(403); // Access forbidden
    }
});

// Method to create a new reimbursement
reimbRouter.post('',async (request:any,response:Response) => {
    // Retrieve information from the request body
    const reimbInfo = request.body;
    // Retrieve current user role
    const roleId : number = parseInt(request.token.role);
    const newReimbursement = await reimbService.createNewReimbursement(reimbInfo,roleId);
    if (newReimbursement) { // Access accepted
        if (newReimbursement.length === 0) {
            response.sendStatus(400); // Could not create
        } else { // Create new reimbursement
            response.status(201).json(newReimbursement);
        }
    } else {
        response.sendStatus(403); // Access forbidden
    }
});

// Method to modify a reimbursement
reimbRouter.patch('',async (request:any,response:Response) => {
    // Retrieve information from the request body
    const reimbInfo : Reimbursement = request.body;
    // Retrieve current user role
    const roleId : number = parseInt(request.token.role);
    const modifiedReimb = await reimbService.modifyReimbursement(reimbInfo,roleId);
    if (modifiedReimb) { // Access accepted
        if (modifiedReimb.length === 0) {
            response.sendStatus(400); // Could not create
        } else { // Create new reimbursement
            response.status(201).json(modifiedReimb);
        }
    } else {
        response.sendStatus(403); // Access forbidden
    }
});

export default reimbRouter;