import { getAllProjects } from '../models/projects.js';

const getProjects = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

export { getProjects };
