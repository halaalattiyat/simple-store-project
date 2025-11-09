const express = require('express');
const router = express.Router();

const users = require('./users.routes');
const products = require('./products.routes');
const orders = require('./orders.routes');

router.use('/users', users);
router.use('/products', products);
router.use('/orders', orders);

module.exports = router;
