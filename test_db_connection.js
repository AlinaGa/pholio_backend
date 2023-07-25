const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
    connectionString,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully.');

        const { rows } = await client.query('SELECT * FROM photographers;');
        console.log('Result:', rows);

        client.release();
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        pool.end();
    }
}

testConnection();
