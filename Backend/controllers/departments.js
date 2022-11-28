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
    params = req.body;
    db.query("INSERT INTO `departments` SET ? ",params,(err,result,fields)=>{
        if(!err){
            res.status(200).json({msg: "department added successfully"});
        }
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
    db.query('delete from departments where department_id = ?',[req.params.id],(err,result,fiels)=>{
        if(!err)
        res.status(200).json({msg: "department deleted successfully"});
        else
            res.send(err);
    })
}
