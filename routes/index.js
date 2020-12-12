const express = require('express');
const router = express.Router();

// Default Index Route
router.get('/', (req,res) => {
    res.render('index');
});

// Export
module.exports = router;