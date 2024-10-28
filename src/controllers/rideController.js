const { ok, failure } = require("./../utils/responseHelper");
const rideService = require('./../Services/rideService');

// Controller function
const rideController = {
  getRides: async function (req, res) {
    try {
      // Get the address from query parameters (assume encoded)
      //let address = decodeURIComponent(req.query.address); 
      let address = req.query.address.toLowerCase(); 
      let available_rides = await rideService.fetchOpenRides(address); 
      let all_rides = await rideService.fetchAllRides(address); 
      
      // Create the response data
      let data = {available_rides, all_rides}; 

      // Send success response
      return ok(res, { error: false, data: data });
    } catch (err) {
      console.log("Error:", err);
      // Send failure response
      return failure(res, { error: true, message: err.message });
    }
  },

  updateRides: async function(req, res){
    try{
      let rid = Number(req.query.rid);
      let uid = String(req.query.uid);
      await rideService.updateRide(rid, uid);
      //return succ ( change the parameter name) 
      data = "Ride Info Updated";
      return ok(res, { error: false, data: data });
    } catch (err){
      return failure(res, {error: true, message: err.message})
    }
  },
};

module.exports = rideController;
