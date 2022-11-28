const express = require('express');
const router = express.Router();

const{ 
    gettickets,
    posttickets,
    updatetickets,
    deletetickets
} = require('../controllers/tickets');

router.get('/tickets',gettickets);
router.post('/tickets',posttickets);
router.patch('/tickets/:id',updatetickets);
router.delete('/tickets/:id',deletetickets);


module.exports = router ;