const createError     = require('http-errors');
const express         = require('express');
// const path            = require('path');
// const cookieParser    = require('cookie-parser');
// const logger          = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// // testing test final test date
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
console.log('1?')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('before')
  next(createError(404, 'what happened?'));
  console.log('after')
});
console.log('2?')
console.log('where do I make it app?')

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