/******************** Modules ********************/
const express = require("express");

/**
 * The Node.js path module doens't require npm install path because it comes built in with Node.js.
 * The path module provides useful ways to work with file and directory paths.
 * Check the documentation here: https://nodejs.org/api/path.html.
 */
const path = require("path");

/******************** Constants ********************/
const app = express();
const port = 5000;
const host = "localhost";

/**
 * Examples of methods given by the path module
 */
console.log(path.basename("/testing/test/something")); // Output: something

/******************** Middleware ********************/

/******************** Routes ********************/
app.get("/", (req, res) => {
  res.send(`Home route`);
});

// This is not a route. Here we just specify which port the server will listen on.
app.listen(port, host, () =>
  console.log(`Example app listening at http://${host}:${port}`)
);
