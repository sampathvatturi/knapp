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
    db.query('select * from tickets',(err,result,fiels)=>{
        if(!err)
            res.send(result);
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
    db.query('select * from tickets',(err,result,fiels)=>{
        if(!err)
            res.send(result);
        else
            res.send(err);
    })
}