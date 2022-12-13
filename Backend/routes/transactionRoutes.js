const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');

const{ 
    getTransactions,
    createTransaction,
    updateTransaction,
    getTransaction
} = require('../controllers/transactions');

router.get('/getTransactions', auth.authenticateToken, getTransactions);
router.post('/createTransaction', auth.authenticateToken, createTransaction);
router.patch('/updateTransaction/:id', auth.authenticateToken, updateTransaction);
router.get('/getTransaction/:id', auth.authenticateToken, getTransaction);

module.exports = router ;