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





// // testing
// const http = require('http');
// const server = http.createServer(app);

app.use('/hi',(req, res, next) => {
  let err = new Error('wazzzza')
  next(err); 
  console.log('do you ever get here')
});


// app.use((req, res, next) => {
//   console.log('before')
//   next(createError(404, 'what happened?')); // createError come from 'http-errors'
//   console.log('after')
// });
// app.use((err, req, res, next) => {
//   console.error('ERROR', req.method, req.path, err);
//   if (!res.headersSent) {
//     res.status(500).send({ msg: 'Check the error on console' });
//   }
// });




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
// app.get('/', (req, res) => {  
//   res.send(`Home route`) 
// })









// const birds = require('./routes/generic')

// // ...


// app.use('/birds', birds)


// // Endpoint example using params
// app.get('/params/:one/:two', (req, res) => {
//   console.log(req.params)
//   res.send(`Get request to /params/${req.params.one}/${req.params.two} endpoint`)
// })

// // Generic get request example
// app.get('/', (req, res) => {
//   res.send('Get request to / endpoint')
// })

// // Generic post request example
// app.post('/', (req, res) => {
//   res.send('Post request to / endpoint')
// })

// // Route with more than one callback functions
// app.get('/multiple-callbacks', (req, res, next) => {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, (req, res) => {
//   res.send('Get request to /multiple-callbacks endpoint!')
// })

// // Route with array of callback functions
// let callback0 = (req, res, next) => {
//   console.log('callback0')
//   next()
// }
// let callback1 = (req, res, next) => {
//   console.log('callback1')
//   next()
// }
// let callback2 = (req, res) => {
//   res.send('callback3')
// }
// app.get('/callback-array', [callback0, callback1, callback2])

// // Route with array of callback functions and two independent functions
// let callback00 = (req, res, next) => {
//   console.log('callback00')
//   next()
// }
// let callback11 = (req, res, next) => {
//   console.log('callback11')
//   next()
// }
// app.get('/callback-combo', [callback00, callback11], (req, res, next) => {
//   console.log('callback33')
//   next()
// }, (req, res) => {
//   res.send('callback44')
// })

/**
 * If the route is not found then this will run
 */
app.use((req, res) => {
  console.log('ERROR', req.method, req.path);
  res.status(404).json({ 
    errorCode: res.status,
    method: req.method,
    path: req.path,
    msg: 'Route Not Found',
  });
});

/**
 * If express catches an err or if next(err) is called then this middleware will run
 */
app.use((err, req, res, next) => {
  console.log('ERROR', req.method, req.path, err);
  /**
   * This statement verifies that no other other middleware or route has sent a response to the client.
   * That way the sever doesn't sent back two responses.
   * The value for res.headersSent will change from false to true once a response is sent (check line 52).
   */
  if (!res.headersSent) {
    console.log('Value before res.send: ', res.headersSent)
    res.status(500).send({ msg: 'Check the error on console' });
    console.log('Value after res.send: ', res.headersSent)
  }
});