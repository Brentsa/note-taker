//Required files for this server
const express = require('express');
const noteRoutes = require('./routes/apiRoutes/noteRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');

//Define the port and instantiate the server
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));

//Middleware to use routes
app.use('/api', noteRoutes);
app.use('/', htmlRoutes)

//Create the listener for the designated port
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});