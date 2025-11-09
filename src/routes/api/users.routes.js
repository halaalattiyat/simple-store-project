const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/users.controller');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);

module.exports = router;
