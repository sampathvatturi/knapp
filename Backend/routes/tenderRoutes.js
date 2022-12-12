const express = require('express');
const router = express.Router();

const{ 
    getTendors,
    createTendor,
    updateTendor,
    deleteTendor,
    getTendor
} = require('../controllers/Tendors');

router.get('/getTendors',getTendors);
router.post('/createTendor',createTendor);
router.patch('/updateTendor/:id',updateTendor);
router.delete('/deleteTendor/:id',deleteTendor);
router.get('/getTendor/:id',getTendor);


module.exports = router ;