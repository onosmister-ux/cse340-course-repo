const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.buildCategories);
router.get("/:id", categoriesController.buildCategoryById);

module.exports = router;