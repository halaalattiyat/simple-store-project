const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/web/users.controller');

router.get('/', ctrl.list);

module.exports = router;
