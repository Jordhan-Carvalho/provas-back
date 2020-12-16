const joiSchema = require("../utils/joiSchemas");
const testsRepository = require("../repositories/testsRepository");

async function postTest(req, res) {
  const testInfo = req.body;

  const { value, error } = joiSchema.testSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });

  try {
    const test = await testsRepository.create(testInfo);
    res.status(201).send(test);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getTest(req, res) {
  const { id } = req.params;
  try {
    const test = await testsRepository.getTest(id);
    res.status(200).send(test);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = { postTest, getTest };
