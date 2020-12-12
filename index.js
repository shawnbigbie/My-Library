// Package Varables
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Hide DB URL
require('dotenv/config');

// Allows Put and Delete HTTP Requests
const methodOverride = require('method-override')

// Load Routes
const indexRoute = require('./routes/index');
const recipeRoute = require('./routes/recipe');
const listRoute = require('./routes/list');

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connected to DB')
);

// Bypass Handlebars Problem Displaying Data
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder
app.set('views', __dirname + '/views')
app.set('layout', '/views/layouts')
app.use(express.static('public'))

// MethodOverride Middleware
app.use(methodOverride('_method'))

// Use Routes
app.use('/', indexRoute);
app.use('/recipes', recipeRoute);
app.use('/lists', listRoute);

// Server
app.listen(PORT, (req, res) => {
    console.log(`Recipe App located on port ${PORT}`)
})