const claims = require('../services/claims.service');
//const mongoose = require('mongoose');
//const Claims = require('../DynamicPage/src/models/claims');

async function get(req, res, next) {
  try {
      res.json(await claims.get(req.query.page));
      claimDetails = await claims.getById(req.user.email);
  } catch (err) {
      console.error(`Error while getting claims`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await claims.add(req.body));
  } catch (err) {
    console.error(`Error while creating claims`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  console.log(req.body);
  const userDetails = await claims.getById(req.body.email);
  console.log('userDetails',userDetails);
  
  try {
    res.json(await claims.update(req.params.email, req.body));
    //claimDetails = await claims.getById(req.user.email);
  } catch (err) {
    console.error(`Error while updating claims`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await claims.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting claims`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};
