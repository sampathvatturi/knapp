const express = require('express');
const router = express.Router();

const{ 
     getInvoicelogs,
     createInvoicelog,
     updateInvoicelog,
     deleteInvoicelog,
     getInvoicelog
} = require('../controllers/invoices');

router.get('/getInvoicelogs', getInvoicelogs);
router.post('/createInvoicelog', createInvoicelog);
router.patch('/updateInvoicelog/:id', updateInvoicelog);
router.delete('/deleteInvoicelog/:id', deleteInvoicelog);
router.get('/getInvoicelog/:id', getInvoicelog);

module.exports = router ;