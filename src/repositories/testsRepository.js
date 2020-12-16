const db = require("../database/index");

async function create(testParams) {
  const {
    semester,
    category_id,
    test_url,
    class_id,
    professor_id,
  } = testParams;

  const res = await db.query(
    "INSERT INTO tests (semester, category_id, test_url, class_id, professor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [semester, category_id, test_url, class_id, professor_id]
  );

  return res.rows[0];
}

async function getTest(testId) {
  const query = `SELECT tests.id, tests.test_url, semester, test_category.name AS "categoryName", classes.name AS "className", professor.name AS "profName", term.name AS "termName" FROM tests JOIN test_category ON tests.category_id = test_category.id JOIN professor ON tests.professor_id = professor.id JOIN classes ON tests.class_id = classes.id JOIN term ON classes.term_id = term.id WHERE tests.id = $1`;
  const res = await db.query(query, [testId]);
  return res.rows[0];
}

module.exports = {
  create,
  getTest,
};
