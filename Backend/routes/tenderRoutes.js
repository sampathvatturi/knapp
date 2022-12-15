const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');

const{ 
    getTenders,
    createTender,
    updateTender,
    deleteTender,
    getTender,
    assignTender
} = require('../controllers/tenders');

router.get('/getTenders', auth.authenticateToken,getTenders);
router.post('/createTender', auth.authenticateToken,createTender);
router.patch('/updateTender/:id', auth.authenticateToken,updateTender);
router.delete('/deleteTender/:id', auth.authenticateToken,deleteTender);
router.get('/getTender/:id', auth.authenticateToken,getTender);
router.patch('/assignTender/:id', auth.authenticateToken,assignTender);


module.exports = router ;