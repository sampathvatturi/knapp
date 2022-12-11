const express = require('express');
const router = express.Router();

const{ 
     getVendorById,
     createVendor,
     updateVendor,
     deleteVendor,
     getVendors,
} = require('../controllers/vendors');

router.get('/getVendors', getVendors);
router.post('/createVendor', createVendor);
router.patch('/updateVendor/:id', updateVendor);
router.delete('/deleteVendor/:id', deleteVendor);
router.get('/getVendorById/:id', getVendorById);

module.exports = router ;