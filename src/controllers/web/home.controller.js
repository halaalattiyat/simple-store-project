const jsonService = require('../../services/json.service');

const index = (req, res) => {
  const products = jsonService.read('products');
  const featuredProducts = products.slice(0, 6);
  res.render('home', { featuredProducts });
};

module.exports = { index };
