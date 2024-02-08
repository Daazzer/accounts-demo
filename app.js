const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const MongoStore = require('connect-mongo');

const { DB_HOST, DB_PROT, DB_NAME, SECRET } = require('./config');

const indexRouter = require('./routes/web');
const authRouter = require('./routes/web/auth');
const accountRouter = require('./routes/api/account');
const authApiRouter = require('./routes/api/auth');

const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: 'sid',
  secret: SECRET,
  saveUninitialized: false,
  resave: true,
  store: MongoStore.create({
    mongoUrl: `mongodb://${DB_HOST}:${DB_PROT}/${DB_NAME}`
  }),
  cookie: {
    httpOnly: true,
    maxAge: 6.048e8
  }
}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(indexRouter);
app.use(authRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
