const db = require('../config/config');

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
    db.query('select * from tickets',(err,result,fiels)=>{
        if(!err)
            res.send(result);
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