
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./src/models");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home"
  });
});

// Organizations route
app.get("/organizations", async (req, res, next) => {
  try {
    const organizations = await db.organizations.getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (error) {
    next(error);
  }
});

// Projects route
app.get("/projects", async (req, res, next) => {
  try {
    const projects = await db.projects.getAllProjects();

    res.render("projects", {
      title: "Projects",
      projects
    });
  } catch (error) {
    next(error);
  }
});

// Categories route
app.get("/categories", async (req, res, next) => {
  try {
    const categories = await db.categories.getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories
    });
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong while retrieving data.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
