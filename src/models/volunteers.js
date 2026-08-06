import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteers (project_id, user_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [projectId, userId]);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteers
        WHERE project_id = $1 AND user_id = $2;
    `;

    await db.query(query, [projectId, userId]);
};

const getVolunteeredProjectsByUserId = async (userId) => {
    const query = `
        SELECT
          project.project_id,
          project.title,
          project.occurs_at,
          project.location
        FROM project
        JOIN project_volunteers
          ON project.project_id = project_volunteers.project_id
        WHERE project_volunteers.user_id = $1
        ORDER BY project.occurs_at;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

const isUserSignedUpForProject = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export { addVolunteer, removeVolunteer, getVolunteeredProjectsByUserId, isUserSignedUpForProject };
