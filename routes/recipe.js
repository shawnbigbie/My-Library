const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Schema
require('../models/Recipe');
const Recipe = mongoose.model('recipes');

// Routes //
// Recipe Index Page
// router.get('/', (req,res) => {
//    Recipe.findAll().then(recipes => {
//      res.render('recipes/index', {
//        recipes:recipes
//      })
//    })
//  });
  
// Add Recipe
router.get('/add', (req,res) => {
    res.render('recipes/add'); 
});

// process recipe form
router.post('/', (req,res) => {
    let errors = [];
    
    if (!req.body.title) {
        errors.push({
            text: 'Please add Recipe Title'
        })
    }
    if (!req.body.rating) {
        errors.push({
            text: 'Please add a Rating'
        })
    }
    if (!req.body.category) {
        errors.push({
            text: 'Please add Category'
        })
    }
    if (!req.body.ingredients) {
        errors.push({
            text: 'Please add Ingredients Needed'
        })
    }
    if (!req.body.directions) {
        errors.push({
        text: 'Please add Directions for Recipe'
        })
    }
    
    if (errors.length > 0) {
      res.render('recipes/add', {
        errors: errors,
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        ingredients: req.body.ingredients,
        directions: req.body.directions
      });
    } else {
      const newRecipe = {
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        ingredients: req.body.ingredients,
        directions: req.body.directions
      };
      new Recipe(newRecipe).save().then(recipe => {
        res.redirect('/');
      })
    }
  });

  

// Export
module.exports = router;
