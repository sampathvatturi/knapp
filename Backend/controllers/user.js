const db = require('../config/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../services/authentication');
const roleCheck = require('../services/checkrole');
const dateTime = require('../middleware/currdate')

//User Login Authentication//
exports.loginUser = async (req, res) => {
    let data = req.body;
    console.log(data);
    user_name = data.email;
    password = data.password;
    const query = "select *,count(*) as count from users where (user_name = '" + user_name + "' and password_md5 = '" + password + "') or (email = '" + user_name + "' and password_md5 = '" + password + "') GROUP BY user_id, password_md5";
    console.log(query);
    db.query(query, (err, result) => {
        if (!err) {
            if (result[0].count === 1) {
                console.log("Result:", result);
                if (result[0].status == 'inactive') {
                    res.status(401).json({ message: 'User is in-active, Please contact admin' });
                } else if (result[0].password_md5 == password) {
                    const response = { user_name: result[0].user_name, email: result[0].email, role : 'admin' };
                    const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '3h' });
                    res.status(200).json({ token: accessToken, user_data: result[0] });
                    db.query("update users set login_time= '"+dateTime+"' where user_id = '"+result[0].user_id+"'")
                } else {
                    res.status(400).json({ message: 'Somthing went wrong, Please try again later.' });
                }
            } else {
                res.status(401).json({ message: "Incorrect Username or Password." });
            }
        } else {
            res.send(err);
        }
    })
}

//Get Users//
exports.getUsers = async (req, res) => {
    const query = 'select * from users';
    db.query(query, (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                res.status(401).json({ message: 'No users found' });
            } else {
                res.status(200).json(result);
            }
        } else {
            res.send(err);
        }
    })
}

exports.createUser = async (req, res) => {
    params = req.body;
    db.query("INSERT INTO `users` SET ? ", params, (err, result, fields) => {
        if (!err) {
            res.status(200).json({ msg: "user added successfully" });
        }
        else
            res.send(err);
    })
}


exports.updateUser = async (req, res) => {
    data = req.body;
    db.query('update users set ? where user_id = ? ', [
        {
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name,
            phone_number: data.phone_number,
            address: data.address,
            role_id: data.role_id,
            status: data.status,
            created_by: data.created_by,
            updated_date: data.updated_date,
            updated_by: data.updated_by,
            department_id: data.department_id
        }, req.params.id], (err, result, fiels) => {
            if (!err)
                res.status(200).json({ msg: "user updated successfully" });
            else
                res.send(err);
        })
}


exports.deleteUser = async (req, res) => {
    db.query('delete from users where user_id = ?', [req.params.id], (err, result, fiels) => {
        if (!err)
            res.status(200).json({ msg: "user deleted successfully" });
        else
            res.send(err);
    })
}


exports.getUser = async (req, res) => {
    db.query('select * from users where user_id = ?', [req.params.id], (err, result, fields) => {
        if (!err)
            res.status(200).json({ data: result });
        else
            res.send(err);
    })
}

exports.checkToken = async (req,res) => {
    res.status(200).json({message: "true"});
}