const express = require('express');
const router = express.Router();

const{ 
    loginuser,
} = require('../controllers/auth');


router.post('/login',loginuser);



module.exports = router ;