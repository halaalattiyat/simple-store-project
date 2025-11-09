const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/web/orders.controller');

router.get('/', ctrl.list);
router.post('/create', ctrl.create); // form posting from web

module.exports = router;
