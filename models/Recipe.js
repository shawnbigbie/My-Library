const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    directions: String,
    rating: Number,
    category: String,
    ingredients: String
})

mongoose.model('recipes', RecipeSchema);