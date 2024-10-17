
const dynamoDB = require('./../db');
const { ok, failure } = require("./../utils/responseHelper");

// Function to fetch rides from DynamoDB
const fetchRides = async (address) => {

  const rideInfo = {
    TableName: 'Rides', //DB table
    FilterExpression: 'end_city = :endcityValue',
    ExpressionAttributeValues:{
      ':endcityValue': address
    },
    ProjectionExpression: 'driver, end_city, time_available, price'
  };

  try {
    const allRides = await dynamoDB.scan(rideInfo).promise(); // Await the scan operation
    console.log(allRides);

    // return all rows
    return allRides.Items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; 
  }
};

// Controller function
const rideController = {
  getRides: async function (req, res) {
    try {
      // Get the address from query parameters (assume encoded)
      //let address = decodeURIComponent(req.query.address); 
      let address = req.query.address; 
      let rides = await fetchRides(address); 

      // Create the response data
      let data = { rides }; 

      // Send success response
      return ok(res, { error: false, data: data });
    } catch (err) {
      console.log("Error:", err);
      // Send failure response
      return failure(res, { error: true, message: err.message });
    }
  },
};

module.exports = rideController;
