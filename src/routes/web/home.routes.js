const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/web/home.controller');

router.get('/', ctrl.index);

module.exports = router;
