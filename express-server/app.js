/******************** Modules ********************/
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { userInfo } = require("os");

/******************** Middleware ********************/
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/******************** Routes ********************/
app.get("/", (req, res, next) => {
  res.send(`Home route`);
});

app.get("/cookie-parser-tester", (req, res) => {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);

  // Set key-value (name: 'express') pair to the cookie object.
  // res.cookie('name', 'express').send('cookie set');

  // Set key-value (user: 'Juan') pair to the cookie object and expire after 5000 ms (i.e. 5 seconds).
  // res.cookie('user', 'Juan', {maxAge: 5000}).send('cookie set with maxAge option');

  // Set key-value (greeting: 'Hi') pair to the cookie object and expire after 10000 ms (i.e. 10 seconds).
  // res.cookie('greeting', 'Hi', {expire: 10000 + Date.now()}).send('cookie set with expire option');
});

// app.use('/error-tester',(req, res, next) => {
//   let err = new Error('Write a custom error here');
//   next(err);
// });

app.use((req, res) => {
  console.log("ERROR", req.method, req.path);
  res.status(404).json({
    error: 404,
    method: req.method,
    path: req.path,
    msg: "Route Not Found",
  });
});

app.use((err, req, res, next) => {
  console.log("ERROR", req.method, req.path, err);
  /**
   * This statement verifies that no other other middleware or route has sent a response to the client.
   * That way the sever doesn't sent back two responses.
   * The value for res.headersSent will change from false to true once a response is sent (check the console.logs below).
   */
  if (!res.headersSent) {
    // console.log('Value before res.send: ', res.headersSent);
    res.status(500).send({ msg: "Server crashed" });
    // console.log('Value after res.send: ', res.headersSent);
  }
});

module.exports = app;
