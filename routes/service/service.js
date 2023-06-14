const express = require('express');
const { getAllServiceTypes, updateServiceType, addServiceType, getServiceTypeById } = require('../../controllers/servicetype.controller.js');
const router = express.Router();

router.get('/', getAllServiceTypes);
router.put('/:id', updateServiceType);
router.post("/new", addServiceType);
router.get('/:id', getServiceTypeById);


module.exports = router;