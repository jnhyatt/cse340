import db from './db.js'

const getAllCategories = async () => (await db.query(`
        SELECT category_id, name
      FROM public.category
      ORDER BY name;
    `)).rows

const getCategoryDetails = async (categoryId) => {
  const query = `
        SELECT category_id, name
      FROM category
      WHERE category_id = $1;
    `;

  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
        SELECT
          category.category_id,
          category.name
        FROM category
        JOIN project_categories
          ON category.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY category.name;
    `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId }
