const express = require("express");
const categoriesRepository = require("../repositories/categoriesRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await categoriesRepository.findAll();
    res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
