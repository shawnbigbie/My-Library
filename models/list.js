const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title: String,
    status: String,
    ingredients: String
})

module.exports = mongoose.model('List', listSchema);