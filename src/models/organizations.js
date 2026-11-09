const pool = require("../database");

async function getAllOrganizations() {
  try {
    const sql = `
      SELECT organization_id, organization_name
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

module.exports = { getAllOrganizations };