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

async function getAllTests() {
  const query = `SELECT tests.id, tests.test_url, semester, test_category.name AS "categoryName", classes.name AS "className", professor.name AS "profName", term.name AS "termName" FROM tests JOIN test_category ON tests.category_id = test_category.id JOIN professor ON tests.professor_id = professor.id JOIN classes ON tests.class_id = classes.id JOIN term ON classes.term_id = term.id`;
  const res = await db.query(query);
  return res.rows[0];
}

async function getProfTestNumber() {
  const res = await db.query(
    `SELECT professor.id ,professor.name, COUNT(*) FROM tests JOIN professor ON tests.professor_id = professor.id GROUP BY professor.id`
  );
  return res.rows;
}

async function getTermsClassesNumber() {
  const res = await db.query(
    `SELECT term.id, term.name, COUNT(*) FROM term JOIN classes ON term.id = classes.term_id GROUP BY term.id`
  );
  return res.rows;
}

async function findTestsCatByProfId(profId) {
  const query = `SELECT test_category.id, test_category.name, COUNT(*) FROM test_category JOIN tests ON tests.category_id = test_category.id WHERE tests.professor_id = $1 GROUP BY test_category.id;`;
  const res = await db.query(query, [profId]);
  return res.rows;
}

async function findTestsCatByClassId(classId) {
  const query = `SELECT test_category.id, test_category.name, COUNT(*) FROM test_category JOIN tests ON tests.category_id = test_category.id WHERE tests.class_id = $1 GROUP BY test_category.id;`;
  const res = await db.query(query, [classId]);
  return res.rows;
}

async function findTestByProfAndCat(profId, catId) {
  const query = `SELECT tests.semester, tests.id, classes.name, tests.test_url FROM tests JOIN classes ON tests.class_id = classes.id WHERE tests.professor_id = $1 AND tests.category_id = $2;`;
  const res = await db.query(query, [profId, catId]);
  return res.rows;
}

async function findTestByClassAndCat(profId, catId) {
  const query = `SELECT tests.semester, tests.id, professor.name, tests.test_url FROM tests JOIN professor ON tests.professor_id = professor.id WHERE tests.class_id = $1 AND tests.category_id = $2;`;
  const res = await db.query(query, [profId, catId]);
  return res.rows;
}

async function getClassesTestNumber() {
  const res = await db.query(
    `SELECT classes.id, classes.name, COUNT(*) FROM tests JOIN classes ON tests.class_id = classes.id GROUP BY classes.id`
  );
  return res.rows;
}

module.exports = {
  create,
  getTest,
  getProfTestNumber,
  getTermsClassesNumber,
  findTestsCatByProfId,
  findTestsCatByClassId,
  findTestByProfAndCat,
  findTestByClassAndCat,
  getClassesTestNumber,
};
