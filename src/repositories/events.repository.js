import connection from './../config/database.js';

async function createInstance(id, value, type) {
  return await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [id, value, type],
  );
}

async function userEvents(id) {
  return await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [id],
  );
}

export { createInstance, userEvents };
