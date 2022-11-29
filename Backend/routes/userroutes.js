const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');
const roleCheck = require('../services/checkrole');

const{ 
     loginUser,
     getUsers,
     createUser,
     updateUser,
     deleteUser,
     getUser,
     checkToken
} = require('../controllers/user');

router.post('/login', loginUser);
router.get('/getUsers', auth.authenticateToken, roleCheck.checkRole, getUsers);
router.post('/createUser', createUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUser/:id', getUser);
router.get('/checkToken', checkToken);

module.exports = router ;