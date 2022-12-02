const adminService = require('../services/admins.service');

async function get(req, res, next) {

    try {
        res.json(await adminService.get());
    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }

}
async function getUser(req, res, next) {

    try {
        res.json(await adminService.get());
    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }
}

async function getUserDetails(req, res, next) {

    try {
        res.json(await adminService.getUserDetails(req.user.email));
    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }
}
async function updateStatus(req, res, next) {

    try {
        res.json(await adminService.updateStatus(req.body));
    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }
}

module.exports = {
    get,
    getUserDetails,
    getUser,
    updateStatus
};
