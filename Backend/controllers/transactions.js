const db = require("../config/connection");
const currdateTime = require('../middleware/currdate');

exports.getTransactions = async (req, res) => {
  db.query("select * from transactions", (err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Transactions not found" });
    } else res.status(401).json({ status: "failed" });
  });
};

exports.createTransaction = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `transactions` SET ? ",
    [
      {
        trsxcn_from: data.trsxcn_from,
        trsxcn_to: data.trsxcn_to,
        category: data.category,
        type: data.type,
        remarks: data.remarks,
        mode: data.mode,
        amount: data.amount,
        created_by: data.created_by,
        updated_by: data.updated_by,
      },
    ],
    (err, result) => {
      if (!err) {
        const bAmount = data.mode === 'banking' ? data.amount : 0;
        const chkAmount =  data.mode === 'cheque' ? data.amount : 0;
        const cardAmount =  data.mode === 'card' ? data.amount : 0;
        const cashAmount =  data.mode === 'cash' ? data.amount : 0;
        const upiAmount =  data.mode === 'upi' ? data.amount : 0;
        let qry = "";
        if(data.type === 'credit') {
            qry = "update `account_details` SET banking = banking + "+  bAmount + ",";
            qry = qry + " cheque = cheque + " + chkAmount  + ",";
            qry = qry + " card = card + " + cardAmount + ",";
            qry = qry + " cash = cash + " + cashAmount + ",";
            qry = qry + " upi = upi + " + upiAmount + ",";
        } else {
            qry = "update `account_details` SET banking = banking - "+  bAmount + ",";
            qry = qry + " cheque = cheque - " + chkAmount  + ",";
            qry = qry + " card = card - " + cardAmount + ",";
            qry = qry + " cash = cash - " + cashAmount + ",";
            qry = qry + " upi = upi - " + upiAmount + ",";
        }        
        qry = qry + "updated_date = '" + currdateTime + "',";
        qry = qry + "updated_by = " + data.updated_by + ",";
        qry = qry + "total = banking + cheque + card + cash + upi";
        qry = qry + " where id=1";
        console.log("Account Qry", qry);
        db.query(qry,(err, result) => { 
              console.log(err,result);
              if(!err){
                res.status(200).json({status: "success", message: "Transaction added successfully"});
              } else {
                res.status(404).json({ status: "failed" });
              }
          });        
      } else { 
        res.status(401).json({ status: "failed" }); 
      }
    }
  );
};

exports.updateTransaction = async (req, res) => {
  data = req.body;  
  const diffAmount = data.diffAmount;
  console.log(data, diffAmount);
  db.query(
    "update transactions set ? where trsxcn_id = ? ",
    [
      {
        trsxcn_from: data.trsxcn_from,
        trsxcn_to: data.trsxcn_to,
        category: data.category,
        type: data.type,
        remarks: data.remarks,
        mode: data.mode,
        amount: data.amount,
        updated_date: currdateTime,
        updated_by: data.updated_by,
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err) {
        const bAmount = data.mode === 'banking' ? (diffAmount) ? diffAmount : data.amount : 0;
        const chkAmount =  data.mode === 'cheque' ? (diffAmount) ? diffAmount : data.amount : 0;
        const cardAmount =  data.mode === 'card' ? (diffAmount) ? diffAmount : data.amount : 0;
        const cashAmount =  data.mode === 'cash' ? (diffAmount) ? diffAmount : data.amount : 0;
        const upiAmount =  data.mode === 'upi' ? (diffAmount) ? diffAmount : data.amount : 0;
        let qry = "";
        if(data.type === 'credit') {
          qry = "update `account_details` SET banking = banking + "+  bAmount + ",";
          qry = qry + " cheque = cheque + " + chkAmount  + ",";
          qry = qry + " card = card + " + cardAmount + ",";
          qry = qry + " cash = cash + " + cashAmount + ",";
          qry = qry + " upi = upi + " + upiAmount + ",";
        } else {
          qry = "update `account_details` SET banking = banking - "+  bAmount + ",";
          qry = qry + " cheque = cheque - " + chkAmount  + ",";
          qry = qry + " card = card - " + cardAmount + ",";
          qry = qry + " cash = cash - " + cashAmount + ",";
          qry = qry + " upi = upi - " + upiAmount + ",";
        }   
        qry = qry + "updated_date = '" + currdateTime + "',";
        qry = qry + "updated_by = " + data.updated_by + ",";
        qry = qry + "total = banking + cheque + card + cash + upi";
        qry = qry + " where id=1";
        console.log("Account Qry", qry);
        db.query(qry,(err, result) => { 
        console.log(err,result);
          if(!err){
            res.status(200).json({status: "success", message: "Transaction updated successfully"});
          } else {
            res.status(404).json({ status: "failed" });
          }
        });
      } else { res.status(401).json({ status: "failed" }); }
    }
  );
};

exports.getTransaction = async (req, res) => {
  db.query(
    "select * from transactions where trsxcn_id = ?",
    [req.params.id],
    (err, result) => {
      if (!err) {
        if (result.length === 1) res.status(200).send(result);
        else res.status(401).json({ message: "Transaction not found" });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.getAcctDetails = async (req, res) => {
  db.query("select * from account_details", (err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Data not found" });
    } else res.status(401).json({ status: "failed" });
  });
};
