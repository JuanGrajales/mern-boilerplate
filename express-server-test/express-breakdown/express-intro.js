/**
 * Node.js is a low-level platform; thus, many frameworks (e.g. Express) were built to enhance Node.js.
 * See some of the popular Node.js frameworks here https://nodejs.dev/learn.
 */ 

/**
 * The Express constant is a top-level function.
 * Before importing (i.e. require) Express you have to install it (npm install Express).
 * Express also comes with some useful methods (see https://expressjs.com/en/api.html#express).
 */ 
const express = require('Express'); 
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
 * While it is not necessary, I find it helpful to set the port and host as a constant.
 * Later on if you decide to change the port or host you can change the value of the constant
 * instead of refactor.
 */
const port = 5000
const host = 'localhost'

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
  res.send(`Home route`) 
})

/**
 * The listen method is used to bind the app so that it listens for connections on the specified host and port.
 * In this example we use 3 parameters for listen method.
 * The second parameter (host) is optional and if you omit it the default will be "localhost"
 * The third parameter (callback) is also optional. 
 */
app.listen(port, host, () => console.log(`Example app listening at http://${host}:${port}`))