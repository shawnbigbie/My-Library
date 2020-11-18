const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Routes //
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories);
    }
    catch(err) {
        console.log(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const category = new Category({
            category: req.body.category,
        })
        const saveCategory = await category.save();
        res.json(saveCategory);
    }
    catch(err) {
        console.log(err)
    }
});

// Export
module.exports = router;
