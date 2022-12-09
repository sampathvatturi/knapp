const express = require('express');
const router = express.Router();

const{ 
    getTransactions,
    createTransaction,
    updateTransaction,
    getTransaction
} = require('../controllers/transactions');

router.get('/getTransactions', getTransactions);
router.post('/createTransaction', createTransaction);
router.patch('/updateTransaction/:id', updateTransaction);
router.get('/getTransaction/:id', getTransaction);

module.exports = router ;