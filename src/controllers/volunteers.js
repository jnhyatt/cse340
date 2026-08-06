import { addVolunteer, removeVolunteer } from '../models/volunteers.js';

const processVolunteerSignup = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You have volunteered for this project!');
    res.redirect(`/project/${projectId}`);
};

const processVolunteerRemoval = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    await removeVolunteer(userId, projectId);

    req.flash('success', 'You are no longer signed up for this project.');
    res.redirect(`/project/${projectId}`);
};

export { processVolunteerSignup, processVolunteerRemoval };
