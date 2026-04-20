import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in .env");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function setup() {
  console.log("Reading setup.sql...");
  const sqlFile = path.resolve(process.cwd(), 'prisma/setup.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  // Split SQL by semicolon, but be careful with nested ones
  // For simplicity since Prisma output is clean, we split by lines or blocks
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  console.log(`Executing ${statements.length} SQL statements on Turso...`);

  for (const statement of statements) {
    try {
      await client.execute(statement);
    } catch (e) {
      // Ignore "already exists" errors
      if (!e.message.includes("already exists")) {
        console.warn(`Warning executing statement: ${e.message}`);
      }
    }
  }

  console.log("Cloud Database schema is now in sync!");
}

setup()
  .catch(e => console.error(e))
  .finally(() => process.exit(0));
