import * as dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const connectionString = process.env.DATABASE_URI;
console.log(typeof process.env.DATABASE_URI);

const pool = new Pool({
  connectionString // Neon requirement
});
export default pool;
