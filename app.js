// Package Varables
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// Hide DB URL
require('dotenv/config');

// Allows Put and Delete HTTP Requests
const methodOverride = require('method-override')

// Load Routes
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// MethodOverride Middleware
app.use(methodOverride('_method'))

// Default Index Route
app.get('/', (req,res) => {
    res.render('index');
 });

// Use Routes
app.use('/recipes', recipeRoute);
app.use('/lists', listRoute);

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Recipe App located on port ${port}`)
})