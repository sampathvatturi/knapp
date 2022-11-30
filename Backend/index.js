const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');


const userRoutes = require('./routes/userroutes');
const ticketRoutes = require('./routes/ticketroutes');
const departmentRoutes = require('./routes/departmentroutes');

const app = express();


app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(express.json());

//table Routes
app.use('/user', userRoutes);
app.use('/tickets', ticketRoutes);
app.use('/dept', departmentRoutes);

module.exports = app;

const time = require('./middleware/currdate')