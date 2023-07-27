const { Pool } = require("pg");

// const connectionString = process.env.CONNECTION_STRING
const connectionString = 'postgres://dnkuyocl:HwIhgqkGkucBJtmwmD0pf7FFI9xFtDKo@trumpet.db.elephantsql.com/dnkuyocl'

const pool = new Pool({
    connectionString,
    // user: "hxquillz",
    // host: "trumpet",
    // database: "hxquillz",
    // password: "nH9ACwqrbnkha0ha0RzGr5014JEfrkS8",
});

module.exports = pool;


