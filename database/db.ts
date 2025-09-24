import * as dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Neon requirement
});
export default pool;
