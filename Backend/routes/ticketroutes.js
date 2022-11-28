const express = require('express');
const router = express.Router();

const{ 
    gettickets,
    posttickets,
    updatetickets,
    deletetickets
} = require('../controllers/tickets');

router.get('/tickets',gettickets);
router.get('/inserticket',posttickets);
router.get('/updateticket',updatetickets);
router.get('/deletetickets',deletetickets);


module.exports = router ;