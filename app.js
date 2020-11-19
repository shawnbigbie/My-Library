// Package Varables
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// Hide DB URL
require('dotenv/config')

// Bypass Handlebars Problem Displaying Data
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Allows Put and Delete HTTP Requests
const methodOverride = require('method-override')

// Default Routes
const recipeRoute = require('./routes/recipe');
const ingredientRoute = require('./routes/ingredient');
const categoryRoute = require('./routes/category');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MethodOverride Middleware
app.use(methodOverride('_method'))

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Default Index Route
app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/list', (req,res) => {
    res.render('list');
});

// Use Routes
app.use('/recipes', recipeRoute);
app.use('/ingredients', ingredientRoute);
app.use('/categories', categoryRoute);

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connected to DB')
);

// Server
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Recipe App located on port ${port}`)
})