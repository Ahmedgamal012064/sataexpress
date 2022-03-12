var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose  = require('mongoose');
//const expressHbs = require('express-handlebars');
const exsession = require('express-session');
const flash   = require('connect-flash');
const passport  = require('passport');
const jwt   = require('jsonwebtoken');
const cors =  require('cors');



//Start Define view Routes
var indexRouter      = require('./routes/index');
var langRouter      = require('./routes/lang');
var usersRouter      = require('./routes/users');
var adminRouter      = require('./routes/admin');
var counteryRouter   = require('./routes/countery');
var govermentsRouter = require('./routes/goverment');
var citiesRouter     = require('./routes/city');
var catRouter        = require('./routes/cat');
var subcatRouter     = require('./routes/subcat');
var couponRouter     = require('./routes/coupon');
var orderRouter      = require('./routes/order');
//End Define view Routes
//Start Define Api Routes
var usersRouterapi      = require('./routes/api/users');
var indexRouterapi      = require('./routes/api/index');
//End Define Api Routes

var app = express();
app.use(cors());
//Connect to database
mongoose.connect('mongodb+srv://sataexpress:sataexpress%402203@cluster0.kkwcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true},(err)=>{ //
  if(err){
    console.log("Error MongoDB : "+err);
  }else{
    console.log('MongoDB database connection successfully');
  }
});

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(exsession({secret :  'token',saveUninitialized : false , resave : true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


//Start Define Views File Route
app.use('/', indexRouter);
app.use('/en',langRouter);
app.use('/admin/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/admin/countries',counteryRouter);
app.use('/admin/goverments',govermentsRouter);
app.use('/admin/cities',citiesRouter); 
app.use('/admin/cats',catRouter); 
app.use('/admin/subcats',subcatRouter); 
app.use('/admin/coupons',couponRouter); 
app.use('/admin/orders',orderRouter);
//End Define Views File Route
//Start Define Apis File Route
app.use('/api',indexRouterapi);
app.use('/api/users',usersRouterapi);
//End Define Apis File Route

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


/*
finish admin page
*/
