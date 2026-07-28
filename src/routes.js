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
    processEditProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    showNewProjectForm,
    showProjectDetailsPage,
} from './controllers/projects.js';
import {
    categoryValidation,
    getCategories,
    processAssignCategoriesForm,
    processEditCategoryForm,
    processNewCategoryForm,
    showAssignCategoriesForm,
    showCategoryDetailsPage,
    showEditCategoryForm,
    showNewCategoryForm,
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
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

export default router;
