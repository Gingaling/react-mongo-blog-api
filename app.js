var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
// const CONNECTION_STRING = process.env.CONNECTION_STRING;

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup connection to mongo
mongoose
	.connect(
		'mongodb+srv://gingaling:GillBing%40959@cluster0.7zraqxx.mongodb.net/MERN-blog?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			family: 4
		}
	)
	.then(() => {
		console.log('Successfully connected to MongoDB Atlas!');
	})
  	.catch(error => {
			console.log('Unable to connect to MongoDB Atlas!');
			console.error(error);
		}
);

const db = mongoose.connection;

// recover from errors
db.on('error', console.error.bind(console, 'connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/posts', postsRouter);

// Return the client
app.get('/posts*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});

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
