import { getAllCategories } from '../models/categories.js';

const getCategories = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Project Categories';
    res.render('categories', { title, categories });
};

export { getCategories };
