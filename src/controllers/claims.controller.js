const claims = require('../services/db.service');

async function get(req, res, next) {
  try {
      res.json(await claims.get(req.query.page));
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
  try {
    res.json(await claims.update(req.params.id, req.body));
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
