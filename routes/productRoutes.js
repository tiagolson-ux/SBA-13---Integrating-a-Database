// Note to self will be the standard T: This file defines all the API routes for products using Express Router. It handles CRUD operations and advanced querying.

const express = require('express'); // Note - I have to make sure for each step: Import Express
const Product = require('../models/Product'); // Note : Import the Product model

const router = express.Router(); // Note -Make sure to: Create a new router instance

// Note : POST /api/products - Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body); // Note: Create a new product from request body
    const savedProduct = await product.save(); // Note: Save the product to the database
    res.status(201).json(savedProduct); // Note to self: Respond with the created product and 201 status
  } catch (error) {
    res.status(400).json({ message: error.message }); // Note: Handle validation errors with 400 status
  }
});

// Note to self: GET /api/products/:id - Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Note: Find product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Note: Return 404 if not found
    }
    res.json(product); // Note: Respond with the product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Note: Handle server errors
  }
});

// Note: PUT /api/products/:id - Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Note to self: Update and return new version
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Note to self: Return 404 if not found
    }
    res.json(product); // Note to self: Respond with updated product
  } catch (error) {
    res.status(400).json({ message: error.message }); // Note to self: Handle validation errors
  }
});

// Note to self: DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Note to self: Delete the product
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Note to self: Return 404 if not found
    }
    res.json({ message: 'Product deleted successfully' }); // Note to self: Respond with success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Note to self: Handle server errors
  }
});

// Note to self: GET /api/products - Get all products with optional querying
router.get('/', async (req, res) => {
  try {
    let query = {}; // Note to self: Start with an empty query object

    // Note to self: Add category filter if provided
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Note to self: Add price filters if provided
    if (req.query.minPrice) {
      query.price = { ...query.price, $gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      query.price = { ...query.price, $lte: parseFloat(req.query.maxPrice) };
    }

    let sort = {}; // Note to self: Default sort object
    if (req.query.sortBy) {
      if (req.query.sortBy === 'price_asc') {
        sort.price = 1; // Note to self: Ascending price
      } else if (req.query.sortBy === 'price_desc') {
        sort.price = -1; // Note to self: Descending price
      }
    }

    const page = parseInt(req.query.page) || 1; // Note to self: Default page 1
    const limit = parseInt(req.query.limit) || 10; // Note to self: Default limit 10
    const skip = (page - 1) * limit; // Note to self: Calculate skip for pagination

    const products = await Product.find(query).sort(sort).skip(skip).limit(limit); // Note to self: Execute the query with sorting and pagination

    res.json(products); // Note to self: Respond with the products array
  } catch (error) {
    res.status(500).json({ message: error.message }); // Note to self: Handle server errors
  }
});

module.exports = router; // Note to self: Export the router