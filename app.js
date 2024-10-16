var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRounter = require('./routes/category')
var brandsRouter = require('./routes/brand')
var subcategoryRouter = require('./routes/subcategory')
var productsRouter = require('./routes/product')
var productdetailsRouter = require('./routes/productdetails')
var adminRouter = require('./routes/admin')
var bannersRouter = require('./routes/banner')
var concernRouter = require('./routes/concern')
var userinterfaceRouter = require('./routes/userinterface')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRounter)
app.use('/brand',brandsRouter)
app.use('/subcategory',subcategoryRouter)
app.use('/product',productsRouter)
app.use('/productdetails',productdetailsRouter)
app.use('/admin',adminRouter)
app.use('/banner',bannersRouter)
app.use('/concern',concernRouter)
app.use('/userinterface',userinterfaceRouter)


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
