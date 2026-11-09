const pool = require("../database");

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

module.exports = { getAllCategories };