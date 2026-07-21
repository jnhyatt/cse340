import db from './db.js'

const getAllProjects = async () => (await db.query(`
        SELECT project.title,
            project.occurs_at,
            organization.name AS organization_name
      FROM public.project
      JOIN public.organization
        ON project.organization_id = organization.organization_id
      ORDER BY project.occurs_at;
    `)).rows

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

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }
