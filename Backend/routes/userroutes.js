const express = require('express');
const router = express.Router();

const{ 
     getusers,
     postusers,
     updateusers,
     deleteusers,
     getuser
} = require('../controllers/users');


router.get('/users',getusers);
router.post('/users',postusers);
router.patch('/user/:id',updateusers);
router.delete('/user/:id',deleteusers);
router.get('/users/:id',getuser);



module.exports = router ;