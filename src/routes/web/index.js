const express = require('express');
const router = express.Router();

const home = require('./home.routes');
const products = require('./products.routes');
const orders = require('./orders.routes');
const users = require('./users.routes');
const about = require('./about.routes');

router.use('/', home);
router.use('/products', products);
router.use('/orders', orders);
router.use('/users', users);
router.use('/about', about);

module.exports = router;
