const db = require("../database/index");

async function findTermsWithClass() {
  const resp = await db.query(
    "SELECT term.name, term.id, COUNT(*) FROM term JOIN classes ON term.id = classes.term_id GROUP BY term.name, term.id;"
  );
  return resp.rows;
}

async function findCatsTermByTermId(termId) {
  const query = `SELECT classes.id, classes.name, COUNT(*) FROM classes JOIN term ON classes.term_id = term.id WHERE classes.term_id = $1 GROUP BY classes.id`;
  const res = await db.query(query, [termId]);
  return res.rows;
}

module.exports = { findTermsWithClass, findCatsTermByTermId };
