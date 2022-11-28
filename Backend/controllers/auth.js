const db = require('../config/config');

//Authentication
exports.loginuser = async(req, res) =>{
    data = req.body;
    user_name = data.user_name;
    password = data.password;
    db.query("select count(*)as count,user_id  from users where user_name = '" + user_name + "' and password_md5 = '"+password+"' ",(err,result,fiels)=>{
        if(!err){
            if(result[0].count === 1){
                db.query("select * from users where user_id = '"+result[0].user_id+"' ",(err,result,fields)=>{
                    if(!err){
                        res.status(200).json({data: result});
                    }
                    else
                        res.send(err);
                })
            }
            else
                res.status(302).json({msg : "user not found"});
        }
        else
            res.send(err);
    })
}


