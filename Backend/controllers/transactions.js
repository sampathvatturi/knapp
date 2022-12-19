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
  start_date = data.start_date.toString().replace(/T/, ' ').replace(/\..+/, '');
  end_date = data.end_date.toString().replace(/T/, ' ').replace(/\..+/, '');

  if(data.type==="%" && data.acc_head !="%"){
    query = "select * from transactions where (trsxcn_date between '"+start_date+"' and '"+end_date+"') and (acc_head  = "+data.acc_head+" or ref_acc_head = "+data.acc_head+") ";
  }else if(data.type !="%" && data.acc_head !="%"){
    query = "select * from transactions where (trsxcn_date between '"+start_date+"' and '"+end_date+"') and (acc_head  = "+data.acc_head+" or ref_acc_head = "+data.acc_head+") and type IN('"+data.type+"')";
  }else if(data.type==="%" && data.acc_head !="%"){
    query = "select * from transactions where (trsxcn_date between '"+start_date+"' and '"+end_date+"') and (acc_head  = "+data.acc_head+" or ref_acc_head = "+data.acc_head+")" ;
  }else if(data.type !="%" && data.acc_head ==="%"){
    query = "select * from transactions where (trsxcn_date between '"+start_date+"' and '"+end_date+"') and type IN('"+data.type+"')";
  }else{
    query = "select * from transactions where (trsxcn_date between '"+start_date+"' and '"+end_date+"')";
  }

  db.query (query,(err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(204).json({ message: "Transactions not found" });
    } else res.status(401).json({ status: "failed" });
  });
};