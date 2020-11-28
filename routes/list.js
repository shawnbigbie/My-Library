const express = require('express');
const router = express.Router();

// Load Schema
const List = require('../models/list');

// Routes //
// Get all Lists Route and Search Filter
router.get('/', async (req,res) => {
  let searchOptions = {}
  if(req.query.title != null && req.query !== '') {
    searchOptions.title = new RegExp(req.query.title, 'i')
  }
  try{
    const lists = await List.find(searchOptions)
    res.render('lists/index', { lists: lists, searchOptions: req.query })
  } catch {
    res.redirect('/lists')
  }
});
  
// Add List Route
router.get('/add', (req,res) => {
    res.render('lists/add', {list: new List() }) 
});

// Create List Route
router.post('/', async (req,res) => {
  const list = new List({
      title: req.body.title,
      status: req.body.status,
      ingredients: req.body.ingredients
  })

  try{
    const newList = await list.save()
    res.redirect('lists')
  } catch {
    res.render('lists/add', {
      list: list,
      errorMessage: 'Error creating List'
    })
  }
})

// Show List Route
router.get('/:id', async (req,res) => {
  try{
    const list = await List.findById(req.params.id)
    res.render('lists/show', {
        list: list
    })
  } catch {
    res.redirect('/')
  }
})

// Edit List Route
router.get('/:id/edit', async (req,res) => {
  try{
    const list = await List.findById(req.params.id)
    res.render('lists/edit', {list: list}) 
  } catch {
    res.redirect('/lists')
  }
})

// Update List Route
router.put('/:id', async (req,res) => {
let list

try{
    list = await List.findById(req.params.id)
    list.title = req.body.title,
    list.status = req.body.status,
    list.ingredients = req.body.ingredients
  await list.save()
  res.redirect('/lists')
  } catch {
    if (list == null) {
      res.redirect('/lists')
    } else {
      res.render('lists/edit', {
        list: list,
        errorMessage: 'Error updating List'
      })
    }
  }
})

// Delete List Route
router.delete('/:id', async (req,res) => {
let list

try{
    list = await List.findById(req.params.id)
  await list.remove()
  res.redirect('/lists')
  } catch {
    if (list == null) {
      res.redirect('/lists')
    }
  }
})

// Export
module.exports = router;