const claims = require('../services/claims.service');

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

module.exports = {
  update
};
