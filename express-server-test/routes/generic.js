/**
 * Resources:
 * Routing: https://expressjs.com/en/guide/routing.html
 */

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('hit middleware in birds route')
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  console.log('birds home page')
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router