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
import {
    processLoginForm,
    processLogout,
    processUserRegistrationForm,
    requireLogin,
    requireRole,
    showDashboard,
    showLoginForm,
    showUserRegistrationForm,
    showUsersPage,
} from './controllers/users.js';

const router = express.Router();

router.get('/', getHome);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', getProjects);
router.get('/categories', getCategories);
router.get('/test-error', getServerError); // Test route for 500 errors
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm,
);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm,
);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm,
);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);

export default router;
