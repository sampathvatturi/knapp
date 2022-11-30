const db = require('../config/connection');

//departments
exports.getDepartments = async(req, res) =>{
    db.query('select * from departments',(err,result,fiels)=>{
        
        if(!err){
            if(result.lenght > 0)
                res.status(200).send(result);
            else
            res.status(404).json({message: "Departments not found"});
        }else
            res.status(401).send(err);
    })
}

exports.createdepartment = async(req, res) =>{
    data = req.body;
    db.query("INSERT INTO `departments` SET ? ",[{
            department_name: data.department_name,
            ranking: data.ranking,
            status: data.status,
            created_by : data.created_by,
            updated_by : data.updated_by
    }],(err,result,fields)=>{
        if(!err){
            res.status(200).json({message: "Department added successfully"});
        }
        else
            res.status(401).send(err);
    })
}

exports.updateDepartment = async(req, res) =>{
    data = req.body;
    db.query('update departments set ? where department_id = ? ',[
        { 
            department_id: data.department_id,
            department_name: data.department_name,
            ranking: data.ranking,
            status: data.status,
            updated_date : data.updated_date,
            updated_by : data.updated_by
        },data.department_id],(err,result,fiels)=>{
        if(!err)
            res.status(200).json({message: "Department updated successfully"});
        else
            res.status(401).send(err);
    })
}

exports.deleteDepartment = async(req, res) =>{
    db.query('delete from departments where department_id = ?',[req.params.id],(err,result,fields)=>{
        if(!err)
            res.status(200).json({message: "Department deleted successfully"});
        else
            res.status(401).send(err);
    })
}

exports.getDepartment = async(req, res) =>{
    db.query('select * from departments where department_id = ?',[req.params.id],(err,result,fiels)=>{
        if(!err){
            if(result.length === 1)
                res.status(200).send(result);
            else
                res.status(401).json({message : "Department not found"}) 
        }
        else
            res.status(401).send(err);
    })
}
