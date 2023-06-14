const express = require('express');
const router = express.Router();
const buyController = require('../../controllers/buyform.controller')

router.get('/', buyController.getAllBuyForm);
router.post('/create', buyController.createBuyForm);

module.exports = router;