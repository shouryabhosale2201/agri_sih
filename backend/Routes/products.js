const express = require('express');
const router = express.Router();
const ProductModel = require('../Models/Product');

router.get('/api/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json({ data: products });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.post('/api/products', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ data: savedProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Serve static files (for images)
router.use('/images', express.static('images'));

module.exports = router;
