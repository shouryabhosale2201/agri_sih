const express = require("express");
const CategoryRouter = require("./category");
const ProductsRouter = require("./products");
const FarmerAuthRouter = require("./farmerAuth");
const router = express.Router();

router.use("/farmer", FarmerAuthRouter);
router.use("/products", ProductsRouter);
router.use("/categories", CategoryRouter);

module.exports = router;
