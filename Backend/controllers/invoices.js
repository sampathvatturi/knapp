const db = require("../config/connection");

//departments
exports.getInvoicelogs = async (req, res) => {
  db.query("select * from invoice_details", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Invoice details not found" });
    } else res.status(401).send(err).json({ status: "failed" });
  });
};

exports.createInvoicelog = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `invoice_details` SET ? ",
    [
      {
        vendor_id: data.vendor_id,
        invoice_item: data.invoice_item,
        quantity: data.quantity,
        amount: data.amount,
        trnsx_type: data.trnsx_type,
        tax: data.tax,
        total: data.total,
        created_by: data.created_by,
        updated_by: data.updated_by,
      },
    ],
    (err, result, fields) => {
      if (!err) {
        res
          .status(200)
          .json({
            status: "success",
            message: "Invoice added successfully",
          });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.updateInvoicelog = async (req, res) => {
  data = req.body;
  db.query(
    "update invoice_details set ? where invoice_details_id = ? ",
    [
      {
        vendor_id: data.vendor_id,
        invoice_item: data.invoice_item,
        quantity: data.quantity,
        amount: data.amount,
        trnsx_type: data.trnsx_type,
        tax: data.tax,
        total: data.total,
        updated_date: data.updated_date,
        updated_by: data.updated_by,
      },
      data.vendor_id,
    ],
    (err, result, fiels) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "Invoice details updated successfully",
          });
      else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.deleteInvoicelog = async (req, res) => {
  db.query(
    "delete from invoice_details where invoice_details_id = ?",
    [req.params.id],
    (err, result, fields) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "Invoice details deleted successfully",
          });
      else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.getInvoicelog = async (req, res) => {
  db.query(
    "select * from invoice_details where invoice_details_id = ?",
    [req.params.id],
    (err, result, fiels) => {
      if (!err) {
        if (result.length === 1) res.status(200).send(result);
        else res.status(401).json({ message: "Invoice details not found" });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};
