"use strict";
exports.__esModule = true;
var Pool = require('pg').Pool;
// Connect to the postgres server
// Info is about the user postgres, which has access to all databases, with the provided
// password
var dbConnect = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ERS',
    password: 'maadpostgres',
    port: 5432
});
exports["default"] = dbConnect;
