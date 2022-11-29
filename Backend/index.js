const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');


const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

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
