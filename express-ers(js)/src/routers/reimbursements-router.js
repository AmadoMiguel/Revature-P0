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
var reimbService = require("../services/reimbursements-services");
// Create the reimbursement router 
var reimbRouter = express_1.Router();
// Add the logic including access permission like in users service
reimbRouter.get('/status/:statusId', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var statId, userRole, reimbursements;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                statId = parseInt(request.params.statusId);
                userRole = parseInt(request.token.role);
                return [4 /*yield*/, reimbService.getReimbByStatusId(statId, userRole)];
            case 1:
                reimbursements = _a.sent();
                if (reimbursements) { // Access accepted
                    if (reimbursements.length === 0) { // No reimbursements found with provided statusId
                        response.sendStatus(404);
                    }
                    else {
                        response.status(200).json(reimbursements); // Show found reimbursements
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
// Add the logic including access permission like in users service
reimbRouter.get('/author/:authorId', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var authorId, userRole, reimbursements;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorId = parseInt(request.params.authorId);
                userRole = parseInt(request.token.role);
                return [4 /*yield*/, reimbService.getReimbByAuthorId(authorId, userRole)];
            case 1:
                reimbursements = _a.sent();
                // If any reimbursement(s) found with that authorId
                if (reimbursements) { // Access accepted
                    if (reimbursements.length === 0) { // No reimbursements found with provided statusId
                        response.sendStatus(404);
                    }
                    else {
                        response.status(200).json(reimbursements); // Show found reimbursements
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
// Method to create a new reimbursement
reimbRouter.post('', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var reimbInfo, roleId, newReimbursement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reimbInfo = request.body;
                console.log(reimbInfo);
                roleId = parseInt(request.token.role);
                return [4 /*yield*/, reimbService.createNewReimbursement(reimbInfo, roleId)];
            case 1:
                newReimbursement = _a.sent();
                if (newReimbursement) { // Access accepted
                    if (newReimbursement.length === 0) {
                        response.sendStatus(400); // Could not create
                    }
                    else { // Create new reimbursement
                        response.status(201).json(newReimbursement);
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
// Method to modify a reimbursement
reimbRouter.patch('', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var reimbInfo, currUser, roleId, modifiedReimb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reimbInfo = request.body;
                currUser = parseInt(request.token.id);
                roleId = parseInt(request.token.role);
                return [4 /*yield*/, reimbService.modifyReimbursement(reimbInfo, currUser, roleId)];
            case 1:
                modifiedReimb = _a.sent();
                if (modifiedReimb) { // Access accepted
                    if (modifiedReimb.length === 0) {
                        response.sendStatus(400); // Could not create
                    }
                    else { // Create new reimbursement
                        response.status(201).json(modifiedReimb);
                    }
                }
                else {
                    response.sendStatus(403); // Access forbidden
                }
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = reimbRouter;
