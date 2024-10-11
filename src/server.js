const express = require('express');
const app = express();
const rideRoutes = require('./routes/rideRoutes'); // Import the rideRoutes file
const userRoutes = require('./routes/userRoutes')
app.use(express.json());

app.use('/rides', rideRoutes); // Use the rideRoutes for handling requests
app.use('/user',userRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
