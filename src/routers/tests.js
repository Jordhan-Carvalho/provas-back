const express = require("express");
const joiSchema = require("../utils/joiSchemas");
const testsRepository = require("../repositories/testsRepository");
const categoriesRepository = require("../repositories/categoriesRepository");
const classesRepository = require("../repositories/classesRepository");
const profRepository = require("../repositories/profRepository");
const termsRepository = require("../repositories/termsRepository");

const router = express.Router();

router.post("/", async (req, res) => {
  const { value, error } = joiSchema.testSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });

  const testInfo = req.body;

  try {
    const test = await testsRepository.create(testInfo);
    res.status(201).send(test);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/professors", async (req, res) => {
  try {
    const tests = await testsRepository.getProfTestNumber();
    res.status(200).send(tests);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/professors/:id/categories", async (req, res) => {
  const profId = req.params.id;
  try {
    const categories = await testsRepository.findTestsCatByProfId(profId);
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/professors/:id/categories/:catId", async (req, res) => {
  const { id, catId } = req.params;

  try {
    const tests = await testsRepository.findTestByProfAndCat(id, catId);
    res.status(200).send(tests);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/terms", async (req, res) => {
  try {
    const terms = await testsRepository.getTermsClassesNumber();
    res.status(200).send(terms);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/terms/:id/classes", async (req, res) => {
  const termId = req.params.id;

  try {
    const classes = await termsRepository.findCatsTermByTermId(termId);
    res.status(200).send(classes);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/classes/:id/categories", async (req, res) => {
  const classId = req.params.id;
  try {
    const categories = await testsRepository.findTestsCatByClassId(classId);
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/classes/:id/categories/:catId", async (req, res) => {
  const { id, catId } = req.params;

  try {
    const tests = await testsRepository.findTestByClassAndCat(id, catId);
    res.status(200).send(tests);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/form-info", async (req, res) => {
  try {
    const classes = await classesRepository.findAll();
    const professors = await profRepository.findAll();
    const categories = await categoriesRepository.findAll();

    res.status(200).send({ professors, categories, classes });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const test = await testsRepository.getTest(id);
    res.status(200).send(test);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
