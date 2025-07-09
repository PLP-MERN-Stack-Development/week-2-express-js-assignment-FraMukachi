const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory database for demonstration
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone model',
    price: 699.99,
    category: 'Electronics',
    inStock: true
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET a specific product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST create a new product
router.post('/', (req, res) => {
  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock || true
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT update an existing product
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const updatedProduct = {
    id: req.params.id,
    name: req.body.name || products[index].name,
    description: req.body.description || products[index].description,
    price: req.body.price || products[index].price,
    category: req.body.category || products[index].category,
    inStock: req.body.inStock !== undefined ? req.body.inStock : products[index].inStock
  };
  
  products[index] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).end();
});

module.exports = router;
