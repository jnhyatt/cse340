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

export { getAllProjects, getProjectsByOrganizationId }
