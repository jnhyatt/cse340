import {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organization.js';
import { isUserSignedUpForProject } from '../models/volunteers.js';
import { body, validationResult } from 'express-validator';

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
        getCategoriesByProjectId(projectId),
    ]);
    const title = 'Project Details';

    const isSignedUp = req.session.user
        ? await isUserSignedUpForProject(req.session.user.user_id, projectId)
        : false;

    res.render('project', { title, project, categories, isSignedUp });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const { title, description, location, occurs_at, organizationId } = req.body;

    try {
        const newProjectId = await createProject(
            title,
            description,
            location,
            occurs_at,
            organizationId,
        );

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const [project, organizations] = await Promise.all([
        getProjectDetails(projectId),
        getAllOrganizations(),
    ]);
    const title = 'Edit Project';

    res.render('edit-project', { title, project, organizations });
};

const processEditProjectForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/edit-project/' + req.params.id);
    }

    const projectId = req.params.id;
    const { title, description, location, occurs_at, organizationId } = req.body;

    await updateProject(projectId, title, description, location, occurs_at, organizationId);

    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
};

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters'),
    body('occurs_at')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Organization must be a valid integer'),
];

export {
    getProjects,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation,
};
