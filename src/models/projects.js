import db from './db.js'

const getAllProjects = async () => (await db.query(`
        SELECT service_project.title,
            service_project.occurs_at,
            organization.name AS organization_name
      FROM public.service_project
      JOIN public.organization
        ON service_project.organization_id = organization.organization_id
      ORDER BY service_project.occurs_at;
    `)).rows

export { getAllProjects }
