
const adminService = require('../services/admins.service');



async function  get(req, res, next) {
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



module.exports = {
    get,
    update,
    
};
