const express = require("express");
const termsRepository = require("../repositories/termsRepository");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const terms = await termsRepository.findTermsWithClass();
    res.status(200).send(terms);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = router;
