const express = require('express');
const router = express.Router();

// Load Schema
const Recipe = require('../models/recipe');

// Routes //
// Get all Recipes Route and Search Filter
router.get('/', async (req,res) => {
  let searchOptions = {}
  if(req.query.title != null && req.query !== '') {
    searchOptions.title = new RegExp(req.query.title, 'i')
  }
  try{
    const recipes = await Recipe.find(searchOptions)
    res.render('recipes/index', { recipes: recipes, searchOptions: req.query })
  } catch {
    res.redirect('/recipes')
  }
});
  
// Add Recipe Route
router.get('/add', (req,res) => {
    res.render('recipes/add', {recipe: new Recipe() }) 
});

// Create Recipe Route
router.post('/', async (req,res) => {
  const recipe = new Recipe({
      title: req.body.title,
      rating: req.body.rating,
      category: req.body.category,
      ingredients: req.body.ingredients,
      directions: req.body.directions
  })

  try{
    const newRecipe = await recipe.save()
    res.redirect('recipes')
  } catch {
    res.render('recipes/add', {
      recipe: recipe,
      errorMessage: 'Error creating Recipe'
    })
  }
})

// Show Recipe Route
router.get('/:id', async (req,res) => {
  try{
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/show', {
      recipe: recipe
    })
  } catch {
    res.redirect('/')
  }
})

// Edit Recipe Route
router.get('/:id/edit', async (req,res) => {
  try{
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/edit', {recipe: recipe}) 
  } catch {
    res.redirect('/recipes')
  }
})

// Update Recipe Route
router.put('/:id', async (req,res) => {
let recipe

try{
  recipe = await Recipe.findById(req.params.id)
    recipe.title = req.body.title,
    recipe.rating = req.body.rating,
    recipe.category = req.body.category,
    recipe.ingredients = req.body.ingredients,
    recipe.directions = req.body.directions
  await recipe.save()
  res.redirect('/recipes')
  } catch {
    if (recipe == null) {
      res.redirect('/recipes')
    } else {
      res.render('recipes/edit', {
        recipe: recipe,
        errorMessage: 'Error updating Recipe'
      })
    }
  }
})

// Delete Recipe Route
router.delete('/:id', async (req,res) => {
let recipe

try{
  recipe = await Recipe.findById(req.params.id)
  await recipe.remove()
  res.redirect('/recipes')
  } catch {
    if (recipe == null) {
      res.redirect('/recipes')
    }
  }
})

// Export
module.exports = router;
