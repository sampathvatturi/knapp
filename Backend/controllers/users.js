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

    // data = Object.keys(req.body);
    // val = req.body; 
   
    // sql = "update users set ";
    // if(data.length === 1){
    //     sql = element +" = "+ val[element] ;
    // }else{
    //     data.forEach(element => {
    //         sql = element +" = "+ val[element]+",";
    //     });
    // }
    
   
    // sql = "where user = ? ";
    // db.query(sql,[req.params.id],(err,result,fiels)=>{
    //     if(!err)
    //         res.status(200).json({msg: "user updated successfully"});
    //     else
    //         res.send(err);
    // })
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