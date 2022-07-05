import pg from 'pg';

const { Pool } = pg;
const connectionString =
  process.env.DATABASE_URL ?? 'postgres://localhost:5432/postgres';
const connection = new Pool({ connectionString });

export default connection;
