const connection = require('./config/connection');

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
    data = req.body;
    db.query('update departments set ? where department_id = ? ',[
        { 
            department_id: data.department_id,
            department_name: data.department_name,
            ranking: data.ranking,
            status: data.status,
            created_by : data.created_by,
            updated_date : data.updated_date,
            updated_by : data.updated_by
        },data.department_id],(err,result,fiels)=>{
        if(!err)
            res.status(200).json({msg: "user updated successfully"});
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
