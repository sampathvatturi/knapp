const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');


const userRoutes = require('./routes/userroutes');
const ticketRoutes = require('./routes/ticketroutes');
const departmentRoutes = require('./routes/departmentroutes');
const vendorRoutes = require('./routes/vendorRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const workRoutes = require('./routes/workRoutes');
const fundRoutes = require('./routes/fundRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

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
app.use('/vendor', vendorRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/invoicedetails', invoiceRoutes);
app.use('/work', workRoutes);
app.use('/fund', fundRoutes);
app.use('/transaction', transactionRoutes);

module.exports = app;

const time = require('./middleware/currdate')