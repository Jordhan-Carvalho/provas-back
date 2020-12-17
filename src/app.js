require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tests = require("./routers/tests");
const terms = require("./routers/terms");
const professors = require("./routers/professors");
const categories = require("./routers/categories");
const classes = require("./routers/classes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tests", tests);
app.use("/api/terms", terms);
app.use("/api/professors", professors);
app.use("/api/categories", categories);
app.use("/api/classes", classes);

module.exports = app;
