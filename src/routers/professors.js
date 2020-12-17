const express = require("express");
const profRepository = require("../repositories/profRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profs = await profRepository.findAll();
    res.status(200).send(profs);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
