const db = require("../config/connection");

//departments
exports.getVendors = async (req, res) => {
  db.query("select * from vendors", (err, result, fiels) => {
    if (!err) {
      if (result.length > 0) res.status(200).send(result);
      else res.status(404).json({ message: "Vendors not found" });
    } else res.status(401).send(err).json({ status: "failed" });
  });
};

exports.createVendor = async (req, res) => {
  data = req.body;
  db.query(
    "INSERT INTO `vendors` SET ? ",
    [
      {
        vendor_name: data.vendor_name,
        phone_number: data.phone_number,
        address: data.address,
        status: data.status,
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
            message: "Vendor added successfully",
          });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.updateVendor = async (req, res) => {
  data = req.body;
  db.query(
    "update vendors set ? where vendor_id = ? ",
    [
      {
        vendor_name: data.vendor_name,
        phone_number: data.phone_number,
        address: data.address,
        status: data.status,
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
            message: "Vendor updated successfully",
          });
      else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.deleteVendor = async (req, res) => {
  db.query(
    "delete from vendors where vendor_id = ?",
    [req.params.id],
    (err, result, fields) => {
      if (!err)
        res
          .status(200)
          .json({
            status: "success",
            message: "Vendor deleted successfully",
          });
      else res.status(401).send(err).json({ status: "failed" });
    }
  );
};

exports.getVendor = async (req, res) => {
  db.query(
    "select * from vendors where vendor_id = ?",
    [req.params.id],
    (err, result, fiels) => {
      if (!err) {
        if (result.length === 1) res.status(200).send(result);
        else res.status(401).json({ message: "Vendor not found" });
      } else res.status(401).send(err).json({ status: "failed" });
    }
  );
};
