// Node.js is a low-level platform; thus, many frameworks (e.g. express) were built to enhance Node.js
// Nodejs frameworks: https://nodejs.dev/learn
const express = require('express');      // Load express module (i.e. files) after npm install express 
const app = express();                   // Create an instance of express
const port = 5000
const birds = require('./routes/generic')

// ...

app.use('/birds', birds)


// Endpoint example using params
app.get('/params/:one/:two', (req, res) => {
  console.log(req.params)
  res.send(`Get request to /params/${req.params.one}/${req.params.two} endpoint`)
})

// Generic get request example
app.get('/', (req, res) => {
  res.send('Get request to / endpoint')
})

// Generic post request example
app.post('/', (req, res) => {
  res.send('Post request to / endpoint')
})

// Route with more than one callback functions
app.get('/multiple-callbacks', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Get request to /multiple-callbacks endpoint!')
})

// Route with array of callback functions
let callback0 = (req, res, next) => {
  console.log('callback0')
  next()
}
let callback1 = (req, res, next) => {
  console.log('callback1')
  next()
}
let callback2 = (req, res) => {
  res.send('callback3')
}
app.get('/callback-array', [callback0, callback1, callback2])

// Route with array of callback functions and two independent functions
let callback00 = (req, res, next) => {
  console.log('callback00')
  next()
}
let callback11 = (req, res, next) => {
  console.log('callback11')
  next()
}
app.get('/callback-combo', [callback00, callback11], (req, res, next) => {
  console.log('callback33')
  next()
}, (req, res) => {
  res.send('callback44')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))