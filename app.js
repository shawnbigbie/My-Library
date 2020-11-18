const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config')

// Load Routes
const recipeRoute = require('./routes/recipe');
const ingredientRoute = require('./routes/ingredient');
const categoryRoute = require('./routes/category');

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'

}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Default Routes
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