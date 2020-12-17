const db = require("../database/index");

async function findTermsWithClass() {
  const resp = await db.query(
    "SELECT term.name, term.id, COUNT(*) FROM term JOIN classes ON term.id = classes.term_id GROUP BY term.name, term.id;"
  );
  return resp.rows;
}

module.exports = { findTermsWithClass };
