// 3rd part module
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");

// my module
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// Connect DB
mongoose
  .connect(
    "mongodb+srv://hodo:F8FCdWu84Lam_ve@cluster0.jjoh0.mongodb.net/smartedu-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// template engine
app.set("view engine", "ejs");

// global variable
global.userIN = null;

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(
  session({
    secret: "my_hodo_code",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db",
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
