const db = require("../models");

// Display all projects
async function buildProjects(req, res, next) {
  try {
    const projects = await db.projects.getAllProjects();

    res.render("projects", {
      title: "Projects",
      projects,
    });
  } catch (error) {
    next(error);
  }
}

// Display one project and its categories
async function buildProjectById(req, res, next) {
  try {
    const projectId = Number(req.params.id);

    const project = await db.projects.getProjectById(projectId);

    if (!project) {
      return res.status(404).render("404", {
        title: "Page Not Found",
      });
    }

    const categories =
      await db.categories.getCategoriesByProjectId(projectId);

    res.render("project", {
      title: project.project_title,
      project,
      categories,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildProjects,
  buildProjectById,
};