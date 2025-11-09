const jsonService = require('../../services/json.service');
const { nanoid } = require('nanoid');

const list = (req, res) => {
  const orders = jsonService.read('orders');
  res.json(orders);
};

const getById = (req, res) => {
  const orders = jsonService.read('orders');
  const o = orders.find(x => x.id === req.params.id);
  if (!o) return res.status(404).json({ error: 'Order not found' });
  res.json(o);
};

const create = (req, res) => {
  const orders = jsonService.read('orders');
  const users = jsonService.read('users');
  const products = jsonService.read('products');
  const body = req.body;

  const user = users.find(u => u.id === body.userId);
  const product = products.find(p => p.id === body.productId);

  if (!user) return res.status(400).json({ error: 'Invalid userId' });
  if (!product) return res.status(400).json({ error: 'Invalid productId' });

  const quantity = Number(body.quantity) || 1;
  const total = Number((product.price * quantity).toFixed(2));

  const newOrder = {
    id: nanoid(8),
    userId: user.id,
    userName: user.name,
    productId: product.id,
    productName: product.name,
    quantity,
    total,
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  jsonService.write('orders', orders);

  // if request from browser form, redirect to orders page
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
    return res.redirect('/orders');
  }

  res.status(201).json(newOrder);
};

module.exports = { list, getById, create };
