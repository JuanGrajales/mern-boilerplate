#!/usr/bin/env node
// shebang line, read more on this

/**
 * Import the express app and all the middleware configurations in that file
 */
const app = require('../server-app');

/**
 * The http object gives you access to helpful methods and info.
 */
const http = require('http');
// console.log('This is what it looks like', http)

/**
 * Here we finally create the server using the http method and the express app that was configured
 */
const server = http.createServer(app);
// console.log('This is what it looks like', server)

/**
 * While it is not necessary, I find it helpful to set the port and host as a constant.
 * Later on if you decide to change the port or host you can change the value of the constant
 * instead of refactor.
 */
const port = 5000
const host = 'localhost'

/**
 * The listen method is used to bind the server so that it listens for connections on the specified host and port.
 * In this example we use 3 parameters for listen method.
 * The second parameter (host) is optional and if you omit it the default will be "localhost"
 * The third parameter (callback) is also optional. 
 */
server.listen(port, host, () => {
  let addr = server.address();
  console.log('Server address info: ', addr)
  console.log(`App listening on http://${host}:${port}`)
})

/**
 * Event listener for HTTP server "error" event.
 * It will start listening when the server runs and it will throw an error if it has an issue running.
 */
server.on('error', (error) => {
  console.log("error-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=", error, error.code)
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});