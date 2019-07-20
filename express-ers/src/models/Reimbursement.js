"use strict";
exports.__esModule = true;
var Reimbursement = /** @class */ (function () {
    function Reimbursement(obj) {
        this.reimbursementId = obj.reimbursementId;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.dateSubmitted;
        this.dateResolved = obj.dateResolved;
        this.description = obj.description;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
    }
    return Reimbursement;
}());
exports["default"] = Reimbursement;
