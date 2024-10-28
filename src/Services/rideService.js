//todo: 
//1. update available seats = total seats - len(user_shared)
//2. If a user is already in {user_shared}, then do not return this ride to the front end?
//3. If a this user is a rider, should not show his own ride
//4. front end(Sayana): if this user already choose this ride, this ride should be greyed out?
//5. front end(Aswin): when create ride, user_shared should be initialized as {rid}
//6. Cancel ride? increase seat by 1, remove user from user_shared, if is_open is =0, update to 1

const dynamoDB = require('./../db');

// Function to fetch all rides from DynamoDB
const fetchAllRides = async () => {

  const rideInfo = {
    TableName: 'Rides', //DB table
    ProjectionExpression: 'rid, rider, start_city, end_city, time_available, seats_available, price, is_open, user_shared'
  };

  try {
    const allRides = await dynamoDB.scan(rideInfo).promise(); // Await the scan operation

    // return all rows
    return allRides.Items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; 
  }
};

// Function to fetch open rides from DynamoDB
const fetchOpenRides = async (address) => {

  const rideInfo = {
    TableName: 'Rides', //DB table
    FilterExpression: 'end_city = :endcityValue and is_open = :openValue', //only returns where start_city, end_city, is_open =1 
    ExpressionAttributeValues:{
      ':endcityValue': address,
      ':openValue': 1
    },
    ProjectionExpression: 'rid, rider, start_city, end_city, time_available, seats_available, price, is_open'
  };

  try {
    const openRides = await dynamoDB.scan(rideInfo).promise(); // Await the scan operation
    // return all rows
    return openRides.Items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; 
  }
};

const updateSeats = async (rideId, userId) => {
  const seatInfo = {
    TableName: 'Rides',
    Key: { 'rid': rideId },
    UpdateExpression: `
      SET seats_available = seats_available - :decVal
      ADD user_shared :userId
    `,
    ConditionExpression: 'seats_available > :seatVal',
    ExpressionAttributeValues: {
      ':decVal': 1,
      ':userId': dynamoDB.createSet([userId]),
      ':seatVal': 0
    }
  };

  try {
    await dynamoDB.update(seatInfo).promise();
  } catch (error) {
    throw new Error(`Error updating seats: ${error.message}`);
  }
};

const updateRideStatus = async (rideId) => {
  const openInfo = {
    TableName: 'Rides',
    Key: { 'rid': rideId },
    UpdateExpression: "SET is_open = :openVal",
    ConditionExpression: 'seats_available = :seatVal',
    ExpressionAttributeValues: {
      ':openVal': 0,
      ':seatVal': 0
    }
  };

  try {
    await dynamoDB.update(openInfo).promise();
  } catch (error) {
    throw new Error(`Error updating ride status: ${error.message}`);
  }
};

const updateRide = async (rideId, userId) => {
  await updateSeats(rideId, userId);
  await updateRideStatus(rideId);
};

module.exports = {updateRide, fetchOpenRides, fetchAllRides};