const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
// const ticketroutes = require('./routes/ticketroutes');
// const departmentroutes = require('./routes/departmentroutes');
// const authroutes = require('./routes/authroutes');

const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(express.json());
app.use('/user', userRoutes);

module.exports = app;

// const express = require('express');
// const cors = require("cors");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({
//     extended:true
// }))
// app.use(cors());
// const db = require('./config/config');

// const userroutes = require('./routes/userroutes');
// const ticketroutes = require('./routes/ticketroutes');
// const departmentroutes = require('./routes/departmentroutes');
// const authroutes = require('./routes/authroutes');

// app.use(userroutes);
// app.use(ticketroutes);
// app.use(departmentroutes);
// app.use(authroutes);

// app.listen('5000',()=>{
//     console.log('server in running')
// })