import * as fs from 'fs';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
// Neon DB connection string
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false } // Neon requirement
});
async function runSchema() {
    try {
        const schema = fs.readFileSync('database/schema.sql', 'utf-8');
        // Split by semicolon so each statement runs separately
        const queries = schema
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length);
        for (const query of queries) {
            console.log('Running query:', query.slice(0, 50) + '...');
            await pool.query(query);
        }
        console.log('Schema successfully applied!');
    }
    catch (err) {
        console.error('Error running schema:', err);
    }
    finally {
        await pool.end();
    }
}
runSchema();
//# sourceMappingURL=seed.js.map
