const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/web/products.controller');

router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);

module.exports = router;
