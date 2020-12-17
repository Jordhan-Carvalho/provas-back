const db = require("../database/index");

async function findAll() {
  const resp = await db.query("SELECT * FROM test_category");
  return resp.rows;
}

module.exports = { findAll };
