const express = require("express");
const mongoose = require("mongoose");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

const app = express();

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 3000;

// template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json

// routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
