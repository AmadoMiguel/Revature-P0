import dbConnect from '../util/DB-cred';
import User from 'models/User';

// User info encryption in order to know who is signed in for the rest of the routers
const jwt = require("jsonwebtoken");

export async function userLogin(usr:string,pass:string) {
    // Request user information from the DB, based on the given credentials
    // Placeholders ($) in the query are used for inject values as text
    if ((usr) && (pass)) { // If both username and password are provided
        try {
            const userInfo = await dbConnect.query(`select "userId","firstName",
            "lastName","email","roleId",public.roles.role_name as role from public.userinfo
            join public.roles on public.userinfo."roleId" = public.roles.roleid 
            where username=$1 and password=$2;`,[usr,pass]);
            return userInfo.rows[0];
        } catch(err) {
            return "Internal server error";
        }
    } else {
        return undefined;
    }
}

export function setTokenWithUserInfo(userInfo:User):Object {
    // Use spread operator to assign each field to User model's field
    let currentUser:User = {...userInfo};
    // Store information for current user with jwt (json web token)
    // Inside the token, the id and roleId are being passed
    const token = jwt.sign(
        {
            id:currentUser.userId,
            role:currentUser.roleId
        }, "thisIsTheSecret",
        {
            expiresIn:"24hr" // Token lasts 24 hrs for each user
        },
    );
    // Send information to the user (including her/his token)
    return {
        message:'Login successful',
        token:token
    }
}