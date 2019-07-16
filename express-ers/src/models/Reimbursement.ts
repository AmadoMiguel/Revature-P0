export default class Reimbursement {
    reimbursementId : number; // primary key
    author : number; // foreign key - user
    amount : number; // not null
    dateSubmitted : string; // string
    dateResolved : string; // string
    description : string; // string
    resolver : number; // number. Foreign key - user
    status : number; // number. Foreign key - ReimbursementStatus
    type : number; // Foreign key - ReimbursementType

    constructor(obj) {
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
}