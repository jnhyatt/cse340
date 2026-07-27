import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const getProjects = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const [project, categories] = await Promise.all([
        getProjectDetails(projectId),
        getCategoriesByProjectId(projectId)
    ]);
    const title = 'Project Details';

    res.render('project', { title, project, categories });
};

export { getProjects, showProjectDetailsPage };
