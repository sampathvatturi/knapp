const connection = require('./config/connection');

//tickets
exports.gettickets = async(req, res) =>{
    db.query('select * from tickets',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}

exports.posttickets = async(req, res) =>{
    params = req.body;
    db.query("INSERT INTO `tickets` SET ? ",params,(err,result,fields)=>{
        if(!err){
            res.status(200).json({msg: "ticket added successfully"});
        }
        else
            res.send(err);
    })
}

exports.updatetickets= async(req, res) =>{
    data = req.body;
    db.query('update tickets set ? where ticket_id = ? ',[
        { 
            ticket_description: data.ticket_description,
            status: data.status,
            department_id: data.department_id,
            created_by : data.created_by,
            updated_date : data.updated_date,
            updated_by : data.updated_by
        },req.params.id],(err,result,fiels)=>{
        if(!err)
            res.status(200).json({msg: "user updated successfully"});
        else
            res.send(err);
    })
}

exports.deletetickets = async(req, res) =>{
    db.query('delete from tickets where ticket_id = ?',[req.params.id],(err,result,fiels)=>{
        if(!err)
        res.status(200).json({msg: "user deleted successfully"});
        else
            res.send(err);
    })
}