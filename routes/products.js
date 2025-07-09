const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors');
const validateProduct = require('../middleware/validation');

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

// GET all products with filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  
  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Filter by inStock
  if (req.query.inStock) {
    const inStock = req.query.inStock.toLowerCase() === 'true';
    filteredProducts = filteredProducts.filter(p => p.inStock === inStock);
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {};
  results.total = filteredProducts.length;
  results.page = page;
  results.limit = limit;
  
  if (endIndex < filteredProducts.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  
  results.data = filteredProducts.slice(startIndex, endIndex);
  res.json(results);
});

// GET search products by name
router.get('/search', (req, res) => {
  if (!req.query.q) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  const searchTerm = req.query.q.toLowerCase();
  const foundProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    p.description.toLowerCase().includes(searchTerm)
  );
  
  res.json(foundProducts);
});

// GET product statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    categories: {},
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length
  };
  
  products.forEach(product => {
    if (!stats.categories[product.category]) {
      stats.categories[product.category] = 0;
    }
    stats.categories[product.category]++;
  });
  
  res.json(stats);
});

// GET a specific product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  res.json(product);
});

// POST create a new product
router.post('/', validateProduct, (req, res) => {
  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT update an existing product
router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    throw new NotFoundError('Product not found');
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
    throw new NotFoundError('Product not found');
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).end();
});

module.exports = router;const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors');
const validateProduct = require('../middleware/validation');

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

// GET all products with filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  
  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Filter by inStock
  if (req.query.inStock) {
    const inStock = req.query.inStock.toLowerCase() === 'true';
    filteredProducts = filteredProducts.filter(p => p.inStock === inStock);
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {};
  results.total = filteredProducts.length;
  results.page = page;
  results.limit = limit;
  
  if (endIndex < filteredProducts.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  
  results.data = filteredProducts.slice(startIndex, endIndex);
  res.json(results);
});

// GET search products by name
router.get('/search', (req, res) => {
  if (!req.query.q) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  const searchTerm = req.query.q.toLowerCase();
  const foundProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    p.description.toLowerCase().includes(searchTerm)
  );
  
  res.json(foundProducts);
});

// GET product statistics
router.get('/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    categories: {},
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length
  };
  
  products.forEach(product => {
    if (!stats.categories[product.category]) {
      stats.categories[product.category] = 0;
    }
    stats.categories[product.category]++;
  });
  
  res.json(stats);
});

// GET a specific product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  res.json(product);
});

// POST create a new product
router.post('/', validateProduct, (req, res) => {
  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT update an existing product
router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    throw new NotFoundError('Product not found');
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
    throw new NotFoundError('Product not found');
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).end();
});

module.exports = router;
