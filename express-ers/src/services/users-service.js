"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var DB_cred_1 = require("../util/DB-cred");
// Function used to get all the users and their info from the database 
function getAllUsers(roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((roleId === 2) || (roleId === 3) || (roleId === 4))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("select \"userId\",\"firstName\", \"lastName\", email,\n            public.roles.role_name as role from public.userinfo \n            join public.roles \n            on public.userinfo.\"roleId\" = public.roles.roleid")];
                case 2:
                    allUsers = _a.sent();
                    if (allUsers.rowCount === 0) { // Data not found
                        return [2 /*return*/, []];
                    }
                    else {
                        return [2 /*return*/, allUsers.rows]; // Return found information
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, "Internal server error"];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
// Function used to get a specific user from the database given his/her id
function getUserById(id, token) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((parseInt(token.role) === 2) || (parseInt(token.role) === 3) ||
                        (parseInt(token.role) === 4) || (parseInt(token.id) === id))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("select \"userId\",\"firstName\", \"lastName\", email,\n            public.roles.role_name as role from public.userinfo \n            join public.roles \n            on public.userinfo.\"roleId\" = public.roles.roleid \n            where \"userId\" = $1", [id])];
                case 2:
                    user = _a.sent();
                    if (user.rowCount === 0) { // User with given id not found in the database
                        return [2 /*return*/, []];
                    }
                    else { // Returns user's info with modifications
                        return [2 /*return*/, user.rows[0]];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    // If there is a query error, is notified as a server error
                    return [2 /*return*/, "Internal server error"];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
// Function used to modify information of a specific user on the database
// Using coalesce to keep unmodified information from the user
function changeUserInfo(patch, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var patchedUser, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(roleId === 4)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("update public.userinfo\n            set username = coalesce($1,username),password = coalesce($2,password),\n            \"firstName\"=coalesce($3,\"firstName\"),\"lastName\"=coalesce($4,\"lastName\"),\n            email = coalesce($5,email), \"roleId\" = coalesce($6,\"roleId\") \n            where \"userId\" = $7 returning \"userId\",\"firstName\",\n            \"lastName\",email,(select role_name as role from roles where roleid=\"roleId\")", [patch.username, patch.password, patch.firstName, patch.lastName, patch.email,
                            patch.roleId, patch.userId])];
                case 2:
                    patchedUser = _a.sent();
                    if (patchedUser.rowCount === 0) { // User with id not found in the database
                        return [2 /*return*/, []];
                    }
                    else { // Returns user with modifications on his info
                        return [2 /*return*/, patchedUser.rows[0]];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, "Internal server error"];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, undefined]; // Access denied
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.changeUserInfo = changeUserInfo;
