const db = require("../database/index");

async function findTermsWithClass() {
  const resp = await db.query(
    "SELECT term.name, term.id, COUNT(*) FROM term JOIN classes ON term.id = classes.term_id GROUP BY term.name, term.id ORDER BY term.name;"
  );
  return resp.rows;
}

async function findCatsTermByTermId(termId) {
  const query = `SELECT classes.id, classes.name, COUNT(*) FROM tests JOIN classes ON tests.class_id = classes.id JOIN term ON classes.term_id = term.id WHERE classes.term_id = $1 GROUP BY classes.id`;
  const res = await db.query(query, [termId]);
  return res.rows;
}

module.exports = { findTermsWithClass, findCatsTermByTermId };
