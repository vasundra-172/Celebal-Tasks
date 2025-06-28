const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory data store for products
let products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
];
let nextId = 3;

// Helper function to find product by ID
const findProductById = (id) => products.find(product => product.id === id);

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = findProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const newProduct = { id: nextId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT to update a product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const product = findProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  if (name) product.name = name;
  if (price) product.price = price;
  res.json(product);
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});