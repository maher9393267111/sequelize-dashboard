const express = require('express');
const { createSellForm, getAllSellForm } = require('../../controllers/sellform.controller.js');
const router = express.Router();

router.get('/', getAllSellForm);
router.post('/create', createSellForm);

module.exports = router;