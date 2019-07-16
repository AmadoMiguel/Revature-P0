export default class User {
    userId : number; // Primary key
    username : string; // not null, unique
    password : string; // not null, unique
    firstName : string;
    lastName : string;
    email : string;
    roleId : number;

    constructor(obj) {
        this.userId = obj.userId;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.roleId = obj.roleId;
    }
}