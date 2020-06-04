/**
 * express is a top-level function
 * Write what this is for
 * */ 
const express = require('express');
// See for yourself 
// console.log('express is a', typeof express, '\nexpress function: \n', express)

/**
 * app is the actual express app
 * Once you create the express app you have access to many helpful functions such as .use(), .get(), etc...
 * */ 
const app = express();
// See for yourself 
// console.log('\napp: \n', typeof app)
// console.log('\napp: \n', app)

app.get('/', (req, res) => {

})
res.json(app)

const createError = require('http-errors');
/**
 * createError is a function
 * Write what this is used for
 * */ 
// See for yourself 
// console.log('createError is a', typeof createError, '\ncreateError function: \n', createError)



// const path            = require('path');
// const cookieParser    = require('cookie-parser');
// const logger          = require('morgan');

/******************** Routes ********************/
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');


// // testing test final test date
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('before')
  next(createError(404, 'what happened?')); // createError come from 'http-errors'
  console.log('after')
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;