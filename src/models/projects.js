import db from './db.js';

const getAllProjects = async () =>
    (
        await db.query(`
        SELECT project.title,
            project.occurs_at,
            organization.name AS organization_name
      FROM public.project
      JOIN public.organization
        ON project.organization_id = organization.organization_id
      ORDER BY project.occurs_at;
    `)
    ).rows;

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          occurs_at
        FROM project
        WHERE organization_id = $1
        ORDER BY occurs_at;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
          project.project_id,
          project.title,
          project.description,
          project.occurs_at,
          project.location,
          project.organization_id,
          organization.name AS organization_name
        FROM project
        JOIN organization
          ON project.organization_id = organization.organization_id
        WHERE project.occurs_at >= NOW()
        ORDER BY project.occurs_at
        LIMIT $1;
      `;

    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
          project.project_id,
          project.title,
          project.occurs_at,
          project.organization_id,
          organization.name AS organization_name
        FROM project
        JOIN organization
          ON project.organization_id = organization.organization_id
        JOIN project_categories
          ON project.project_id = project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY project.occurs_at;
      `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
          project.project_id,
          project.title,
          project.description,
          project.occurs_at,
          project.location,
          project.organization_id,
          organization.name AS organization_name
        FROM project
        JOIN organization
          ON project.organization_id = organization.organization_id
        WHERE project.project_id = $1;
      `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const createProject = async (title, description, location, occurs_at, organizationId) => {
    const query = `
      INSERT INTO project (title, description, location, occurs_at, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, occurs_at, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getProjectsByCategoryId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
};
