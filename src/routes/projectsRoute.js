const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

router.get("/", projectsController.buildProjects);
router.get("/:id", projectsController.buildProjectById);

module.exports = router;