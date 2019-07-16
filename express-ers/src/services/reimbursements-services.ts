import Reimbursement from '../models/Reimbursement';
import dBConnection from '../util/DB-cred';

// Return reimbursement(s) with given statusId
export async function getReimbByStatusId(id:number,roleId:number) {
    // Check if current signed in user has permission to access this info
    if ( (roleId===2)||(roleId===3) ) { // Access accepted
        try {
            const result = await dBConnection.query(`select * 
            from public."Reimbursement" where status = $1`,[id]);
            if (result.rowcount === 0) { // Reimbursements not found with given statusId
                return [];
            } else { // Return found reimbursements
                return result.rows;
            }
        } catch(err) { // If there's a problem in the query
            return err;
        }
    }  else { // Access denied
        return undefined;
    }
}

// Return reimbursement(s) with given authorId
export async function getReimbByAuthorId(id:number,roleId:number) {
    // Check if current signed in user has permission to access this info
    if ( (roleId===2)||(roleId===3) ) { // Access accepted
        try {
            const result = await dBConnection.query(`select * 
            from public."Reimbursement" where author = $1`,[id]);
            if (result.rowcount === 0) { // Reimbursements not found with given authorId
                return [];
            } else { // Return found reimbursements
                return result.rows;
            }
        } catch(err){
            return err;
        }
        
    }  else { // Access denied
        return undefined;
    }
}

// Function to create a new reimbursement
export async function createNewReimbursement(reimbursement:Reimbursement,roleId:number) {
    // Check if current signed in user has permission to access this info
    if ( (roleId===2)||(roleId===3) ) { // Access accepted
        try {
            const newReimbursement = await dBConnection.query(`insert into public."Reimbursement" 
            (author,amount,description,resolver,status,type,dateresolved,datesubmitted)
            values ($1,$2,$3,$4,$5,$6,$7,$8) 
            returning id,author,amount,description,
            resolver,status,type,dateresolved,datesubmitted`,
            [reimbursement.author,reimbursement.amount,reimbursement.description,
            reimbursement.resolver,reimbursement.status,reimbursement.type,
            reimbursement.dateResolved,reimbursement.dateSubmitted]);

            if (newReimbursement.rowcount === 0) { // Couldn't create reimbursement
                return [];
            } else { // Return new reimbursement
                return newReimbursement.rows[0];
            }
        } catch(err) {
            return err;
        }
    }  else { // Access denied
        return undefined;
    }
}

// Function to update a reimbursement
export async function modifyReimbursement(reimbInfo:Reimbursement,roleId:number) {
    // Check if current signed in user has permission to access this info
    if ( (roleId===2)||(roleId===3) ) { // Access accepted
        try {
            // Update information query. Non-modified fields remain untouched by using
            // coalesce function
            const patchedReimb = await dBConnection.query(`update public."Reimbursement"
            set author=coalesce($1,author),amount=coalesce($2,amount),
            description=coalesce($3,description),resolver=coalesce($4,resolver),
            status=coalesce($5,status),type=coalesce($6,type),
            dateresolved=coalesce($7,dateresolved),datesubmitted=coalesce($8,datesubmitted)
            where id=$9 
            returning id,author,amount,description,resolver,status,type,dateresolved,datesubmitted`,
            [reimbInfo.author,reimbInfo.amount,reimbInfo.description,reimbInfo.resolver,
            reimbInfo.status,reimbInfo.type,reimbInfo.dateResolved,reimbInfo.dateSubmitted,
            reimbInfo.reimbursementId]);
            if (!patchedReimb.rows[0].id) { // Couldn't modify reimbursement
                return [];
            } else { // Return modified reimbursement
                return patchedReimb.rows[0];
            }
        } catch(err) {
            return err;
        }
    }  else { // Access denied
        return undefined;
    }
}