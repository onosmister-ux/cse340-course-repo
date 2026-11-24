const db = require("../models");

// Display all categories
async function buildCategories(req, res, next) {
  try {
    const categories = await db.categories.getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
}

// Display one category and its projects
async function buildCategoryById(req, res, next) {
  try {
    const categoryId = Number(req.params.id);

    const category = await db.categories.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render("404", {
        title: "Page Not Found",
      });
    }

    const projects =
      await db.categories.getProjectsByCategoryId(categoryId);

    res.render("category", {
      title: category.category_name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildCategories,
  buildCategoryById,
};