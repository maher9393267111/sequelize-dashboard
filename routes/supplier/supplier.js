const express = require('express');
const router = express.Router();
const controller = require("../../controllers/supplier.controller")
//const checkUserPermission = require("../../middleware/authorization").checkUserPermission

router.get('/', controller.getAllSuppliers);
router.post('/create', controller.createSupplier)

//router.post('/create', checkUserPermission('createSupplier'), controller.createSupplier)

router.put('/update/:id', controller.updateSupplier)
module.exports = router;