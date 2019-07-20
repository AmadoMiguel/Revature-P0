"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(obj) {
        this.userId = obj.userId;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.roleId = obj.roleId;
    }
    return User;
}());
exports["default"] = User;
