import express from 'express';

import { getHome } from './controllers/index.js';
import {
    organizationValidation,
    processEditOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    showNewOrganizationForm,
    showOrganizationDetailsPage,
    showOrganizationsPage,
} from './controllers/organizations.js';
import {
    getProjects,
    processNewProjectForm,
    projectValidation,
    showNewProjectForm,
    showProjectDetailsPage,
} from './controllers/projects.js';
import {
    getCategories,
    processAssignCategoriesForm,
    showAssignCategoriesForm,
    showCategoryDetailsPage,
} from './controllers/categories.js';
import { getServerError } from './controllers/errors.js';

const router = express.Router();

router.get('/', getHome);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', getProjects);
router.get('/categories', getCategories);
router.get('/test-error', getServerError); // Test route for 500 errors
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

export default router;
