import express from 'express';

import { getHome } from './controllers/index.js';
import { showOrganizationDetailsPage, showOrganizationsPage } from './controllers/organizations.js';
import { getProjects, showProjectDetailsPage } from './controllers/projects.js';
import { getCategories } from './controllers/categories.js';
import { getServerError } from './controllers/errors.js';

const router = express.Router();

router.get('/', getHome);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', getProjects);
router.get('/categories', getCategories);
router.get('/test-error', getServerError); // Test route for 500 errors
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);

export default router;
