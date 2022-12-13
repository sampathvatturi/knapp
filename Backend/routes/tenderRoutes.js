const express = require('express');
const router = express.Router();

const{ 
    getTenders,
    createTender,
    updateTender,
    deleteTender,
    getTender
} = require('../controllers/');

router.get('/getTenders',getTenders);
router.post('/createTender',createTender);
router.patch('/updateTender/:id',updateTender);
router.delete('/deleteTender/:id',deleteTender);
router.get('/getTender/:id',getTender);


module.exports = router ;