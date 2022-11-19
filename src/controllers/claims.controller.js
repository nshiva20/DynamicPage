const claims = require('../services/claims.service');

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
  let updatedClaims;
  try {
    updatedClaims = claims.update(req.user.email, req.body);

    if (updatedClaims) {
      res
        .status(200)
        .json({
          success: true,
          message: 'Claims updated successfully'
        })
    }

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
