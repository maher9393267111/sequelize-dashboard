const express = require("express");
const {
  getAllProductTypes,
  createNewProductType,
  getWithId,
  updateProductType,
} = require("../../controllers/producttype.controller.js");
const router = express.Router();

router.get("/", getAllProductTypes);
router.post("/new-type", createNewProductType);
router.get("/:id", getWithId);
router.put("/update/:id", updateProductType);

module.exports = router;
