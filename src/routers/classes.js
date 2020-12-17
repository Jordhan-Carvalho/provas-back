const express = require("express");
const classesRepository = require("../repositories/classesRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await classesRepository.findAll();
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
