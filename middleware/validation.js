const { ValidationError } = require('../errors');

function validateProduct(req, res, next) {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    throw new ValidationError('Name, price, and category are required');
  }
  
  if (typeof price !== 'number' || price <= 0) {
    throw new ValidationError('Price must be a positive number');
  }
  
  next();
}

module.exports = validateProduct;
