const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const { notFound, errorHandler } = require('./middlewares/errorHandlers');

const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
