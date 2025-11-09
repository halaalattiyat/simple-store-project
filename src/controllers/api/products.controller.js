const jsonService = require('../../services/json.service');
const { nanoid } = require('nanoid');

const list = (req, res) => {
  const products = jsonService.read('products');
  res.json(products);
};

const getById = (req, res) => {
  const products = jsonService.read('products');
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Product not found' });
  res.json(p);
};

const create = (req, res) => {
  const products = jsonService.read('products');
  const newP = { id: nanoid(8), ...req.body };
  products.unshift(newP);
  jsonService.write('products', products);
  res.status(201).json(newP);
};

const update = (req, res) => {
  const products = jsonService.read('products');
  const idx = products.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  jsonService.write('products', products);
  res.json(products[idx]);
};

const remove = (req, res) => {
  let products = jsonService.read('products');
  products = products.filter(x => x.id !== req.params.id);
  jsonService.write('products', products);
  res.json({ success: true });
};

module.exports = { list, getById, create, update, remove };
