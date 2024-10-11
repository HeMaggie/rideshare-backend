const router = require("express").Router();
const rideController = require('../controllers/rideController'); // Import the rideController

router.get('/getRides', rideController.getRides);

module.exports = router; // Export the app instance
