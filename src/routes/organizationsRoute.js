const express = require("express");
const router = express.Router();
const organizationsController = require("../controllers/organizationsController");

router.get("/", organizationsController.buildOrganizations);
router.get("/:id", organizationsController.buildOrganizationById);

module.exports = router;