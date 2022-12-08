const db = require("../config/connection");
const currdateTime = require('../middleware/currdate');

//funds
exports.getFunds = async (req, res) => {
  db.query("select * from funds", (err, result) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Funds not found" });
    } else res.status(401).send(err).json({ status: "failed" });
  });
};

exports.createFund = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `funds` SET ? ",
    [
      {
        fund_type: data.fund_type,
        fund_description: data.fund_description,
        transaction_mode: data.transaction_mode,
        fund_value: data.fund_value,
        fund_released_date: currdateTime,
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
            message: "Fund added successfully",
          });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.updateFund = async (req, res) => {
  data = req.body;
  db.query(
    "update funds set ? where fund_id = ? ",
    [
      {
        fund_type: data.fund_type,
        fund_description: data.fund_description,
        transaction_mode: data.transaction_mode,
        fund_value: data.fund_value,
        fund_released_date: data.fund_released_date,
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
            message: "Fund updated successfully",
          });
      else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.getFund = async (req, res) => {
  db.query(
    "select * from funds where fund_id = ?",
    [req.params.id],
    (err, result) => {
      if (!err) {
        if (result.length === 1) res.status(200).send(result);
        else res.status(401).json({ message: "Fund not found" });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};
