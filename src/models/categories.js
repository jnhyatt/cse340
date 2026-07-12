import db from './db.js'

const getAllCategories = async () => (await db.query(`
        SELECT category_id, name
      FROM public.category
      ORDER BY name;
    `)).rows

export { getAllCategories }
