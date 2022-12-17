const db = require("../config/connection");
const currdateTime = require('../middleware/currdate');



exports.createTransaction = async (req, res) => {
  data = req.body;
  //acc_head = to,ref_acc_head = from
  credit_query = "insert into transactions set acc_head = "+data.acc_head+",type='credit',remarks="+data.remarks+",mode="+data.mode+",trsxcn_date="+data.trsxcn_date+",amount="+data.amount+",created_by="+data.created_by+",ref_acc_head="+data.ref_acc_head+" ";

  debit_query = "insert into transactions set acc_head = "+data.ref_acc_head+",type='debit',remarks="+data.remarks+",mode="+data.mode+",trsxcn_date="+data.trsxcn_date+",amount="+data.amount+",created_by="+data.created_by+",ref_acc_head="+data.acc_head+" ";

    db.query(debit_query,(err,result)=>{
      if(!err){
        db.query(credit_query,(err,result)=>{
          if(!err) res.status(200).json({status:"success",message:"Transaction added successfully"});
          else res.status(500).json({status:"failed",message:"Debit Entry Failed"});
        })
      }else res.status(500).json({status:"failed",message:"Transaction adding failed"});
    })
  
};

exports.getTransactions = async (req, res) => {
  data = req.body;
  console.log(data)
  if(data.type==='all'){
    query = "select * from transactions where (trsxcn_date between '"+data.start_date+"' and '"+data.end_date+"') and (acc_head  = "+data.acc_head+" or ref_acc_head = "+data.acc_head+") ";
  }else{
    query = "select * from transactions where (trsxcn_date between '"+data.start_date+"' and '"+data.end_date+"') and (acc_head  = "+data.acc_head+" or ref_acc_head = "+data.acc_head+") and type IN('"+data.type+"')";
  }

  db.query (query,(err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Transactions not found" });
    } else res.status(401).json({ status: "failed" });
  });
};