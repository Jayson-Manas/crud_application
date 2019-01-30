var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

///////////////////////////////////////////////

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// var Pokemon = require('./db.json');

var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');
var viewRouter = require('./routes/view');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyParser Middleware
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//this is not needed if you have bodyParser
//express middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//register routes after middleware
app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/view', viewRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
  
//app listen on this port
app.listen(8000);