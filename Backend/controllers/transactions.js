const db = require("../config/connection");
const currdateTime = require('../middleware/currdate');

//transactions
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
        title: data.title,
        remarks: data.remarks,
        mode: data.mode,
        trsxcn_date: data.trsxcn_date,
        amount: data.amount,
        created_by: data.created_by,
        updated_by: data.updated_by,
      },
    ],
    (err, result) => {
      if (!err) {
        res
          .status(200)
          .json({
            status: "success",
            message: "Transaction added successfully",
          });
      } else res.status(401).json({ status: "failed" });
    }
  );
};

exports.updateTransaction = async (req, res) => {
  data = req.body;
  db.query(
    "update transactions set ? where trsxcn_id = ? ",
    [
      {
        trsxcn_from: data.trsxcn_from,
        trsxcn_to: data.trsxcn_to,
        category: data.category,
        title: data.title,
        remarks: data.remarks,
        mode: data.mode,
        trsxcn_date: data.trsxcn_date,
        amount: data.amount,
        updated_date: currdateTime,
        updated_by: data.updated_by,
      },
      req.params.id,
    ],
    (err, result) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "Transaction updated successfully",
          });
      else res.status(401).json({ status: "failed" });
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
