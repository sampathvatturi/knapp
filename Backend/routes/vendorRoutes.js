const express = require('express');
const router = express.Router();

const{ 
     getVendor,
     createVendor,
     updateVendor,
     deleteVendor,
     getVendors,
} = require('../controllers/vendors');

router.get('/getVendors', getVendors);
router.post('/createVendor', createVendor);
router.patch('/updateVendor/:id', updateVendor);
router.delete('/deleteVendor/:id', deleteVendor);
router.get('/getVendor/:id', getVendor);

module.exports = router ;