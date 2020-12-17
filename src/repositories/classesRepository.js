const db = require("../database/index");

async function findAll() {
  const resp = await db.query(
    "SELECT * FROM classes JOIN term ON term.id = classes.term_id"
  );
  return resp.rows;
}

module.exports = { findAll };
