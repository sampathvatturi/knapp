const db = require('../config/config');

exports.create = async(req, res) =>{
    db.query("CREATE TABLE `users` (`user_id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(100) NOT NULL,`last_name` varchar(100) NOT NULL, `user_name` varchar(50) NOT NULL,`password_md5` varchar(50) NOT NULL,`phone_number` int(20) NOT NULL, `address` text NOT NULL,`email` varchar(200) NOT NULL,`role_id` int(11) NOT NULL,`status` enum('active','inactive') NOT NULL,`create_date` datetime NOT NULL, `created_by` int(11) NOT NULL,`updated_date` datetime NOT NULL,`updated_by` int(11) NOT NULL,`department_id` int(11) NOT NULL,PRIMARY KEY (`user_id`),) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;)",(err,result,fields)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })

    db.query("CREATE TABLE `departments` (   `department_id` int(11) NOT NULL AUTO_INCREMENT,   `department_name` varchar(100) NOT NULL,   `ranking` int(11) NOT NULL,   `status` enum('active','inactive') NOT NULL,   `created_date` datetime NOT NULL,   `created_by` int(11) NOT NULL,   `updated_date` datetime NOT NULL,   `updated_by` int(11) NOT NULL,   `department_code` varchar(10) NOT NULL,PRIMARY KEY (`department_id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;)",(err,result,fields)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })

    db.query("CREATE TABLE `tickets` (   `ticket_id` int(11) NOT NULL AUTO_INCREMENT,   `ticket_description` varchar(200) NOT NULL,   `status` enum('open','close','accept','reject') NOT NULL,   `department_id` int(11) NOT NULL,   `created_date` datetime NOT NULL,   `created_by` int(11) NOT NULL,   `updated_date` datetime NOT NULL,   `updated_by` int(11) NOT NULL,PRIMARY KEY (`ticket_id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;)",(err,result,fields)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })

    db.query("CREATE TABLE `tickets_audit_log` ( `ticket_audit_log_id` int(11) NOT NULL AUTO_INCREMENT, `ticket_id` int(11) NOT NULL,   `ticket_description` varchar(200) NOT NULL,   `status` enum('open','close','accept','reject') NOT NULL,   `department_id` int(11) NOT NULL,   `created_date` datetime NOT NULL,   `created_by` int(11) NOT NULL,   `updated_date` datetime NOT NULL,   `updated_by` int(11) NOT NULL,   `method` enum('update','delete') NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;)",(err,result,fields)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}