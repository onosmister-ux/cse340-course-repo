
const pool = require("../database");

// Get all organizations
async function getAllOrganizations() {
  try {
    const sql = `
      SELECT
        organization_id,
        organization_name,
        description,
        contact_email,
        logo
      FROM organizations
      ORDER BY organization_name;
    `;

    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error getting organizations:", error);
    throw error;
  }
}

// Get one organization by ID
async function getOrganizationById(organizationId) {
  try {
    const sql = `
      SELECT
        organization_id,
        organization_name,
        description,
        contact_email,
        logo
      FROM organizations
      WHERE organization_id = $1;
    `;

    const result = await pool.query(sql, [organizationId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting organization by ID:", error);
    throw error;
  }
}

// Get all projects belonging to an organization
async function getProjectsByOrganizationId(organizationId) {
  try {
    const sql = `
      SELECT
        project_id,
        project_title,
        location,
        date
      FROM projects
      WHERE organization_id = $1
      ORDER BY date;
    `;

    const result = await pool.query(sql, [organizationId]);
    return result.rows;
  } catch (error) {
    console.error("Error getting organization projects:", error);
    throw error;
  }
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
};
