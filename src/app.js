require("dotenv").config();
const express = require("express");
const cors = require("cors");

const testsController = require("./controllers/testsController");
const termsController = require("./controllers/termsController");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tests", testsController);
app.use("/api/terms", termsController);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
