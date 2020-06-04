/**
 * Node.js is a low-level platform; thus, many frameworks (e.g. Express) were built to enhance Node.js.
 * See some of the popular Node.js frameworks here https://nodejs.dev/learn.
 */ 

/**
 * The Express constant is a top-level function.
 * Before importing (i.e. require) Express you have to install it (npm install Express).
 * Express also comes with some useful methods (see https://expressjs.com/en/api.html#express).
 */ 
const express = require('express'); 

/**
 * The app constant is the actual Express app (it is an instance of Express).
 * The app object has properties that include
 *    - Methods for routing HTTP requests
 *    - Methods for configuring middleware
 *    - Methods for rendering HTML views
 *    - Methods for registering a template engine
 *    - Settings (i.e properties) that affect how the app behaves
 * We will talk about all these properties more in depth later. 
 * Make sure you import Express before actually calling express().
 * Learn more at https://expressjs.com/en/api.html#app.
 */ 
const app = express();   

/**
 * Path is an object that helps facilate file paths.
 * Below you will see how we use the join method from path to establish where the static files will be located.
 */
const path = require('path');

/**
 * The cookieParser populates req.cookies.
 * Cookies are a small pice of text stored on the clients computer by their browser.
 * Common uses for cookies are authentication, storing site preferences, shopping cart items (think Amazon), etc.
 * Each time time the client broswer interacts with the server it will pass the cookie info to the server.
 */
const cookieParser = require('cookie-parser');

/**
 * Dont panic :D
 * Morgan is a HTTP request logger middleware... What?
 * It basically logs (prints to the console) in a specified format information about the request that was made.
 */
const logger = require('morgan');

/**
 * Here the imported (i.e. required) path to specify the path where all static files will be located.
 * express.static is middleware built into express.
 * __dirname is a variable from NodeJS that tells you the absolute path of the current file. 
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Tell express to use the cookieParser middleware
 */
app.use(cookieParser())

/**
 * Here we tell express to use the morgan logger with the predefined 'dev' format.
 */
app.use(logger('dev'));

/**
 * These next two lines give us access to req.body, which is information sent from the client. 
 * It is a built-in middleware. Before the body-parser package had to be used.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routing refers to determining how an application responds to a client request to a particular endpoint.
 * An endpoint is a URI (or path) and a specific HTTP request method (e.g. GET, POST, etc).
 * In the example below a client makes a get request to the / path and the server responds with "Home route".
 * The req object represents the HTTP request and has many properties that will be covered later.
 * Learn more at https://expressjs.com/en/api.html#req.
 * The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * Learn more at https://expressjs.com/en/api.html#res.
 * In this example we are using the send method, which is a property of the res object.
 */
app.get('/', (req, res) => {  
  res.send(`Home route`);
});

/**
 * This route shows how to add cookies from the server.
 * You can see the cookies from the browser by typing console.log(document.cookie) in the browser console.
 */
app.get('/cookie-parser-tester', (req, res) => {  
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
  
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  
  // Set key-value (name: 'express') pair to the cookie object.
  // res.cookie('name', 'express').send('cookie set');

  // Set key-value (user: 'Juan') pair to the cookie object and expire after 5000 ms (i.e. 5 seconds).
  // res.cookie('user', 'Juan', {maxAge: 5000}).send('cookie set with maxAge option');

  // Set key-value (greeting: 'Hi') pair to the cookie object and expire after 10000 ms (i.e. 10 seconds).
  // res.cookie('greeting', 'Hi', {expire: 10000 + Date.now()}).send('cookie set with expire option');
});

/**
 * A route that manual creates an error and then calls the next middleware that handles errors
 */
app.use('/error-tester',(req, res, next) => {
  let err = new Error('Write a custom error here');
  next(err); 
});

/**
 * If the route is not found (i.e. 404) then this route will run. 
 */
app.use((req, res) => {
  console.log('ERROR', req.method, req.path);
  res.status(404).json({ 
    error: 404,
    method: req.method,
    path: req.path,
    msg: 'Route Not Found',
  });
});

/**
 * Custome error-handling middleware. 
 * If express catches an err or if next(err) is called then this middleware will run. 
 */
app.use((err, req, res, next) => {
  console.log('ERROR', req.method, req.path, err);
  /**
   * This statement verifies that no other other middleware or route has sent a response to the client.
   * That way the sever doesn't sent back two responses.
   * The value for res.headersSent will change from false to true once a response is sent (check the console.logs below).
   */
  if (!res.headersSent) {
    // console.log('Value before res.send: ', res.headersSent);
    res.status(500).send({ msg: 'Check the error on console' });
    // console.log('Value after res.send: ', res.headersSent);
  }
});

module.exports = app;