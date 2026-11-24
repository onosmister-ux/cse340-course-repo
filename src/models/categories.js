
const pool = require("../database");

// Get all categories
async function getAllCategories() {
  try {
    const sql = `
      SELECT category_id, category_name
      FROM categories
      ORDER BY category_name;
    `;

    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

// Get one category by ID
async function getCategoryById(categoryId) {
  try {
    const sql = `
      SELECT category_id, category_name
      FROM categories
      WHERE category_id = $1;
    `;

    const result = await pool.query(sql, [categoryId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting category by ID:", error);
    throw error;
  }
}

// Get all projects belonging to a category
async function getProjectsByCategoryId(categoryId) {
  try {
    const sql = `
      SELECT
        projects.project_id,
        projects.project_title,
        projects.location,
        projects.date
      FROM projects
      INNER JOIN project_categories
        ON projects.project_id = project_categories.project_id
      WHERE project_categories.category_id = $1
      ORDER BY projects.date;
    `;

    const result = await pool.query(sql, [categoryId]);
    return result.rows;
  } catch (error) {
    console.error("Error getting projects by category:", error);
    throw error;
  }
}

// Get all categories belonging to a project
async function getCategoriesByProjectId(projectId) {
  try {
    const sql = `
      SELECT
        categories.category_id,
        categories.category_name
      FROM categories
      INNER JOIN project_categories
        ON categories.category_id = project_categories.category_id
      WHERE project_categories.project_id = $1
      ORDER BY categories.category_name;
    `;

    const result = await pool.query(sql, [projectId]);
    return result.rows;
  } catch (error) {
    console.error("Error getting categories by project:", error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
};
