const express = require('express');
const { getAllServiceForm } = require('../../controllers/serviceform.controller');
const { updateServiceDetail, getServiceDetails } = require('../../controllers/serviceformdetail.controller');
const router = express.Router();

router.get('/', getAllServiceForm);
router.put('/detail/:id', updateServiceDetail)
router.get('/detail/:id', getServiceDetails);

module.exports = router;