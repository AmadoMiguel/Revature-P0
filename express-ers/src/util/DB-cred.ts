const Pool = require('pg').Pool;

// Connect to the postgres server
// Info is about the user postgres, which has access to all databases, with the provided
// password
const dbConnect = new Pool({
    user:'postgres',
    host:'localhost',
    database:'ERS',
    password: 'maadpostgres',
    port: 5432
});

export default dbConnect;
