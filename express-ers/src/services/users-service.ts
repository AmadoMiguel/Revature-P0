import dbConnect from '../util/DB-cred';
import User from 'models/User';

// Function used to get all the users and their info from the database 
export async function getAllUsers(roleId:number) {
    // It's known from the database that the authorized roles for this process
    // are finance, manager or admin (roleId 2, 3 or 4)
    // The distinction between query result error and access permission error is handled
    // separately
    if ((roleId===2) || (roleId===3) || (roleId===4)) { // Access accepted
        // Try-catch block to handle any server error and prevent 
        // application from blocking
        try {
            const allUsers = await dbConnect.query(
            `select "userId","firstName", "lastName", email,
            public.roles.role_name as role from public.userinfo 
            join public.roles 
            on public.userinfo."roleId" = public.roles.roleid`);
            if (allUsers.rowCount === 0) { // Data not found
                return [];
            } else {
                return allUsers.rows; // Return found information
            }
        } catch(err) {
            return "Internal server error";
        }
    } else { // Access denied
        return undefined;
    }
}

// Function used to get a specific user from the database given his/her id
export async function getUserById(id:number,token) {
    // Check if current user is whether finance, manager, admin 
    // or the user with same searched id
    // The distinction between query result error and access permission error is handled
    // separately handled
    if ( (parseInt(token.role)===2)  || (parseInt(token.role)===3) || 
         (parseInt(token.role)===4) || (parseInt(token.id)===id) )
         { // Access accepted
        try {
            const user = await dbConnect.query(
            `select "userId","firstName", "lastName", email,
            public.roles.role_name as role from public.userinfo 
            join public.roles 
            on public.userinfo."roleId" = public.roles.roleid 
            where "userId" = $1`,[id]);
            if (user.rowCount === 0) { // User with given id not found in the database
                return [];
            } else { // Returns user's info with modifications
                return user.rows[0];
            }
        } catch(err) {
            // If there is a query error, is notified as a server error
            return "Internal server error";
        }
    } else { // Access denied
        return undefined;
    }    
}

// Function used to modify information of a specific user on the database
// Using coalesce to keep unmodified information from the user
export async function changeUserInfo(patch:User,roleId:number) {
    // Only administrator has access to do this
    if (roleId===4)  { // Access accepted
        try {
            const patchedUser = await dbConnect.query(
            `update public.userinfo
            set username = coalesce($1,username),password = coalesce($2,password),
            "firstName"=coalesce($3,"firstName"),"lastName"=coalesce($4,"lastName"),
            email = coalesce($5,email), "roleId" = coalesce($6,"roleId") 
            where "userId" = $7 returning "userId","firstName",
            "lastName",email,(select role_name as role from roles where roleid="roleId")`,
            [patch.username,patch.password,patch.firstName,patch.lastName,patch.email,
            patch.roleId,patch.userId]);
            if (patchedUser.rowCount === 0) { // User with id not found in the database
                return [];
            } else { // Returns user with modifications on his info
                return patchedUser.rows[0];
            }
        } catch (err) {
            return "Internal server error";
        }
    } else {
        return undefined; // Access denied
    }
}