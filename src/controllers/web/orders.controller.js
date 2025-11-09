const jsonService = require('../../services/json.service');

const list = (req, res) => {
  const orders = jsonService.read('orders');
  res.render('orders', { orders });
};

const create = (req, res) => {
  // route: POST /orders/create from web form
  const { productId, userId, quantity } = req.body;
  // reuse API logic via direct invocation:
  const apiCtrl = require('../../controllers/api/orders.controller');
  // mimic req/res for API create or call service manually
  // simpler: create order here using json service:
  const users = jsonService.read('users');
  const products = jsonService.read('products');
  const orders = jsonService.read('orders');

  const user = users.find(u => u.id === userId);
  const product = products.find(p => p.id === productId);
  if (!user || !product) {
    return res.redirect('/orders'); // simple fallback
  }

  const qty = Number(quantity) || 1;
  const total = Number((product.price * qty).toFixed(2));
  const { nanoid } = require('nanoid');
  const newOrder = {
    id: nanoid(8),
    userId: user.id,
    userName: user.name,
    productId: product.id,
    productName: product.name,
    quantity: qty,
    total,
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  jsonService.write('orders', orders);

  res.redirect('/orders');
};

module.exports = { list, create };
