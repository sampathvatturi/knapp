const db = require('../config/config');

//users
exports.getusers = async(req, res) =>{
    db.query('select * from users',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}

exports.postusers = async(req, res) =>{

    params = req.body;
    db.query("INSERT INTO `users` SET ? ",params,(err,result,fields)=>{
        if(!err){
            res.status(200).json({msg: "user added successfully"});
        }
        else
            res.send(err);
    })
}


exports.updateusers = async(req, res) =>{

    data = req.body;
    db.query('update users set ? where user_id = ? ',[{ first_name: data.first_name,last_name: data.last_name},req.params.id],(err,result,fiels)=>{
        if(!err)
            res.status(200).json({msg: "user updated successfully"});
        else
            res.send(err);
    })
}


exports.deleteusers = async(req, res) =>{
    db.query('delete from users where user_id = ?',[req.params.id],(err,result,fiels)=>{
        if(!err)
        res.status(200).json({msg: "user deleted successfully"});
        else
            res.send(err);
    })
}


exports.getuser = async(req, res) =>{
    db.query('select * from users where user_id = ?',[req.params.id],(err,result,fields)=>{
        if(!err)
        res.status(200).json({data: result});
        else
            res.send(err);
    })
}