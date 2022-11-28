const db = require('../config/config');

//departments
exports.getdepartments = async(req, res) =>{
    db.query('select * from departments',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}

exports.postdepartments = async(req, res) =>{
    db.query('select * from departments',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}

exports.updatedepartments = async(req, res) =>{
    db.query('select * from departments',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}

exports.deletedepartments = async(req, res) =>{
    db.query('select * from departments',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}
