const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const scheduleRouter = require("./routes/apis/schedule");
const appointmentRouter = require("./routes/apis/appointment");
const Bundler = require("parcel-bundler");
// const bodyParser = require("body-parser");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false, sourceMaps: true }));
app.use(cookieParser());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(bodyParser.json());
// app router
app.use("/", indexRouter);

// api routers
app.use("/api/schedule", scheduleRouter);
app.use("/api/appointment", appointmentRouter);

// setup parcel in dev env
if (process.env.NODE_ENV === "development") {
  const bundler = new Bundler(
    path.resolve(__dirname, "../client/scripts.html")
  );
  app.use(bundler.middleware());
} else {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
