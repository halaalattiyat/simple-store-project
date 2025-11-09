const jsonService = require('../../services/json.service');

const list = (req, res) => {
  const products = jsonService.read('products');
  res.render('products', { products });
};

const detail = (req, res) => {
  const products = jsonService.read('products');
  const p = products.find(x => x.id === req.params.id);
  if (!p) return res.status(404).render('404', { message: 'Product not found' });
  res.render('product-details', { product: p });
};

module.exports = { list, detail };
