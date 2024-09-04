const express = require('express');
const router = express.Router();
const CategoryModel = require('../Models/Category');

router.get('/api/categories', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json({ data: categories });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.post('/api/categories', async (req, res) => {
    try {
        const newCategory = new CategoryModel(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json({ data: savedCategory });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

router.use('/images', express.static('images'));

module.exports = router;
