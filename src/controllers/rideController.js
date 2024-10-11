const { ok, failure } = require("./../utils/responseHelper");
const rideController = {
  getRides: async function (req, res) { // New method added
    try {
      let data = {}// Fetching rides data
      return ok(res, { error: false, data: data });
    } catch (err) {
      console.log("error", err);
      return failure(res, { error: true, message: err });
    }
  },
};
module.exports = rideController;
