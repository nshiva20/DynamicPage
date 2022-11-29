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

async function update(req, res, next) {
    try {
        res.json(await adminService.update(req.params.id, req.body));
        // findOnenandReplae 
    } catch (err) {
        console.error(`Error while updating login`, err.message);
        next(err);
    }
}
async function getUserDetails(req, res, next) {
    console.log(JSON.stringify(req.user.email) + " cotrl")
    try {

        res.json(await adminService.getUserDetails(req.user.email));
    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }
}
async function updateStatus(req, res, next) {
    // console.log(JSON.stringify(req.body) + " cotrl updateStatus")
    // let claimStatusData = {
    //     email: req.user.email,
    //     ClaimData: req.body
    // }
    try {
        res.json(await adminService.updateStatus(req.body));

    } catch (err) {
        console.error(`Error while getting user details `, err.message);
        next(err);
    }
}

module.exports = {
    get,
    update,
    getUserDetails,
    getUser,
    updateStatus
};
