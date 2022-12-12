const express = require('express');
const router = express.Router();

const{ 
     getInvoices,
     createInvoice,
     updateInvoice,
     deleteInvoice,
     getInvoice
} = require('../controllers/invoices');

router.get('/getInvoices', getInvoices);
router.post('/createInvoice', createInvoice);
router.patch('/updateInvoice/:id', updateInvoice);
router.delete('/deleteInvoice/:id', deleteInvoice);
router.get('/getInvoice/:id', getInvoice);

module.exports = router ;