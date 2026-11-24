const pool = require("../database");

// Get the next five upcoming projects
async function getAllProjects() {
  try {
    const sql = `
      SELECT
        projects.project_id,
        projects.project_title,
        projects.location,
        projects.date,
        organizations.organization_id,
        organizations.organization_name
      FROM projects
      INNER JOIN organizations
        ON projects.organization_id = organizations.organization_id
      WHERE projects.date >= CURRENT_DATE
      ORDER BY projects.date ASC
      LIMIT 5;
    `;

    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error getting upcoming projects:", error);
    throw error;
  }
}

// Get one project by ID
async function getProjectById(projectId) {
  try {
    const sql = `
      SELECT
        projects.project_id,
        projects.project_title,
        projects.location,
        projects.date,
        organizations.organization_id,
        organizations.organization_name
      FROM projects
      INNER JOIN organizations
        ON projects.organization_id = organizations.organization_id
      WHERE projects.project_id = $1;
    `;

    const result = await pool.query(sql, [projectId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting project by ID:", error);
    throw error;
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
};