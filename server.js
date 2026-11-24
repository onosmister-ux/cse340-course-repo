const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Import routes
const organizationsRoute = require("./src/routes/organizationsRoute");
const projectsRoute = require("./src/routes/projectsRoute");
const categoriesRoute = require("./src/routes/categoriesRoute");

// Use routes
app.use("/organizations", organizationsRoute);
app.use("/projects", projectsRoute);
app.use("/categories", categoriesRoute);

// Details pages
app.use("/organization", organizationsRoute);
app.use("/project", projectsRoute);
app.use("/category", categoriesRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500", { title: "Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});