require("dotenv").config();
const express = require("express");
const cors = require("cors");

const testsController = require("./controllers/testsController");

const app = express();

app.use(cors());
app.use(express.json());

// Tests routes
app.post("/api/tests", testsController.postTest);
app.get("/api/tests/:id", testsController.getTest);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
