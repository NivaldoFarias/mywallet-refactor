import connection from './../config/database.js';

async function findEmail(email) {
  return await connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [
    email,
  ]);
}

async function createInstance(name, email, hashedPassword) {
  return await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword],
  );
}

export { findEmail, createInstance };
