import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({ url, authToken });

async function test() {
  console.log("Testing Turso connection...");
  const rs = await client.execute("SELECT 1");
  console.log("Turso connection successful:", rs.rows[0]);
}

test().catch(e => console.error(e)).finally(() => process.exit(0));
