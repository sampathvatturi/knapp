const express = require('express');
const router = express.Router();

const{ 
    getFunds,
    createFund,
    updateFund,
    getFund
} = require('../controllers/funds');

router.get('/getFunds', getFunds);
router.post('/createFund', createFund);
router.patch('/updateFund/:id', updateFund);
router.get('/getFund/:id', getFund);

module.exports = router ;