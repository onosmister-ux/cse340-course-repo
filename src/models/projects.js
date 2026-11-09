const pool = require("../database");

async function getAllProjects() {
  try {
    const sql = `
      SELECT
        projects.project_id,
        projects.project_title,
        projects.project_date,
        organizations.organization_name
      FROM projects
      INNER JOIN organizations
        ON projects.organization_id = organizations.organization_id
      ORDER BY projects.project_date;
    `;

    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
}

module.exports = { getAllProjects };