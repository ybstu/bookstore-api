let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cors = require("cors");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
const port = 3001;

let index = express();

// view engine setup
index.set("views", path.join(__dirname, "views"));

index.use(cors());
index.use(logger("dev"));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, "/public")));

// catch 404 and forward to error handler
index.use(function (req, res, next) {
  next(createError(404));
});

// error handler
index.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

index.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = index;
