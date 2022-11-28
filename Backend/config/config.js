const mysql = require('mysql');
// const con = mysql.createConnection({
//     database:'department_appr',
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     port:'3310'
// });


const con = mysql.createConnection({
    database:'knapp',
    host: 'database-2.cbc4xnqy8kql.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    port:'3306'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = con;