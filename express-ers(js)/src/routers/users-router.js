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
var _this = this;
exports.__esModule = true;
var express_1 = require("express");
// Import the current user info to know his/her role and determine
// if he/she has access to users information
var userServices = require("../services/users-service");
// Create a new router
var usersRouter = express_1.Router();
// First, roleId from actual user has to be checked to 
// allow/deny access. Or, if the id of the current user
// matches the searched id.
// Get all users
usersRouter.get('', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userServices.getAllUsers(parseInt(request.token.role))];
            case 1:
                allUsers = _a.sent();
                if (allUsers) { // Access accepted
                    if (allUsers.length === 0) { // No users registered yet
                        response.sendStatus(404);
                    }
                    else {
                        response.status(200).json(allUsers); // Shows all users
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
// Get user with specific id
usersRouter.get('/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(request.params.id);
                return [4 /*yield*/, userServices.getUserById(id, request.token)];
            case 1:
                user = _a.sent();
                if (user) { // Access accepted
                    if (user.length === 0) { // No users found with given id
                        response.sendStatus(404);
                    }
                    else {
                        response.status(200).json(user); // Shows user with given id
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
// Patch method to update determined user information, according to the body 
// request info
usersRouter.patch('', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var patch, patchedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                patch = request.body;
                return [4 /*yield*/, userServices.changeUserInfo(patch, parseInt(request.token.role))];
            case 1:
                patchedUser = _a.sent();
                if (patchedUser) { // Access accepted
                    if (patchedUser.length === 0) { // Could not find user with id provided in the request body
                        response.sendStatus(404);
                    }
                    else {
                        response.status(200).json(patchedUser); // Shows modified info from user
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = usersRouter;
