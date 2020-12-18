const db = require("../database/index");

async function findAll() {
  const resp = await db.query("SELECT * FROM classes");
  return resp.rows;
}

module.exports = { findAll };
