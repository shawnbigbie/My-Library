const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    category: String,
    ingredients: String,
    directions: String
})

module.exports = mongoose.model('Recipe', recipeSchema);