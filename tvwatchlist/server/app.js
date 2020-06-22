var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var usersRouter = require('./routes/Users');
var commentsRouter = require('./routes/Comments');
var genresRouter = require('./routes/Genres');
var showRouter = require('./routes/Shows');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/genres', genresRouter);
app.use('/shows', showRouter);


module.exports = app;
