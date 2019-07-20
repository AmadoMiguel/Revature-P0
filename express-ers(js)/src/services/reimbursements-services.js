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
// Return reimbursement(s) with given statusId
function getReimbByStatusId(id, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((roleId === 2) || (roleId === 3) || (roleId === 4))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("select * \n            from public.\"Reimbursement\" where status = $1", [id])];
                case 2:
                    result = _a.sent();
                    if (result.rowcount === 0) { // Reimbursements not found with given statusId
                        return [2 /*return*/, []];
                    }
                    else { // Return found reimbursements
                        return [2 /*return*/, result.rows];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getReimbByStatusId = getReimbByStatusId;
// Return reimbursement(s) with given authorId
function getReimbByAuthorId(id, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((roleId === 2) || (roleId === 3) || (roleId === 4))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("select * \n            from public.\"Reimbursement\" where author = $1", [id])];
                case 2:
                    result = _a.sent();
                    if (result.rowcount === 0) { // Reimbursements not found with given authorId
                        return [2 /*return*/, []];
                    }
                    else { // Return found reimbursements
                        return [2 /*return*/, result.rows];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, err_2];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getReimbByAuthorId = getReimbByAuthorId;
// Function to create a new reimbursement
function createNewReimbursement(reimbursement, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var newReimbursement, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((roleId === 2) || (roleId === 3) || (roleId === 4))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("insert into public.\"Reimbursement\" \n            (author,amount,description,resolver,status,type,dateresolved,datesubmitted)\n            values ($1,$2,$3,$4,$5,$6,$7,$8) \n            returning id,author,amount,description,\n            resolver,status,type,dateresolved,datesubmitted", [reimbursement.author, reimbursement.amount, reimbursement.description,
                            reimbursement.resolver, reimbursement.status, reimbursement.type,
                            reimbursement.dateResolved, reimbursement.dateSubmitted])];
                case 2:
                    newReimbursement = _a.sent();
                    if (newReimbursement.rowcount === 0) { // Couldn't create reimbursement
                        return [2 /*return*/, []];
                    }
                    else { // Return new reimbursement
                        return [2 /*return*/, newReimbursement.rows[0]];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, err_3];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createNewReimbursement = createNewReimbursement;
// Function to update a reimbursement
function modifyReimbursement(reimbInfo, resolvId, roleId) {
    return __awaiter(this, void 0, void 0, function () {
        var patchedReimb, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!((roleId === 2) || (roleId === 3) || (roleId === 4))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, DB_cred_1["default"].query("update public.\"Reimbursement\"\n            set author=coalesce($1,author),amount=coalesce($2,amount),\n            description=coalesce($3,description),resolver=coalesce($4,resolver),\n            status=coalesce($5,status),type=coalesce($6,type),\n            dateresolved=coalesce($7,dateresolved),datesubmitted=coalesce($8,datesubmitted)\n            where id=$9 \n            returning id,author,amount,description,resolver,status,type,dateresolved,datesubmitted", [reimbInfo.author, reimbInfo.amount, reimbInfo.description, resolvId,
                            reimbInfo.status, reimbInfo.type, reimbInfo.dateResolved, reimbInfo.dateSubmitted,
                            reimbInfo.reimbursementId])];
                case 2:
                    patchedReimb = _a.sent();
                    if (!patchedReimb.rows[0].id) { // Couldn't modify reimbursement
                        return [2 /*return*/, []];
                    }
                    else { // Return modified reimbursement
                        return [2 /*return*/, patchedReimb.rows[0]];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    return [2 /*return*/, err_4];
                case 4: return [3 /*break*/, 6];
                case 5: // Access denied
                return [2 /*return*/, undefined];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.modifyReimbursement = modifyReimbursement;
