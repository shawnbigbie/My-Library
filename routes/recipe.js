const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

//Entered: /recipes

//ROUTES//
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.json(recipes);
    }
    catch(err) {
        console.log(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const recipe = new Recipe({
            title: req.body.title,
            directions: req.body.directions,
            rating: req.body.rating,
            category: req.body.category,
            ingredients: []
        })
        const saveRecipe = await recipe.save();
        res.json(saveRecipe);
    }
    catch(err) {
        console.log(err)
    }
});

router.patch('/title', async (req, res) => {
    console.log(req.body)
    try {
        const recipeUpdate = await Recipe.findOneAndUpdate({_id: req.body._id}, {$set: {title: req.body.title}});
        res.json(recipeUpdate)
    }
    catch(error) {
        console.log(error);
    }
});

router.patch('/rating', async (req, res) => {
    console.log(req.body)
    try {
        const recipeUpdate = await Recipe.findOneAndUpdate({_id: req.body._id}, {$set: {rating: req.body.rating}});
        res.json(recipeUpdate)
    }
    catch(error) {
        console.log(error);
    }
})

router.patch('/directions', async (req, res) => {
    console.log(req.body)
    try {
        const recipeUpdate = await Recipe.findOneAndUpdate({_id: req.body._id}, {$set: {directions: req.body.description}});
        res.json(recipeUpdate)
    }
    catch(error) {
        console.log(error);
    }
})

//EXPORT
module.exports = router;
