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
     checkToken,
     getUserByDepartmentId,
     getUsersByDepartment
} = require('../controllers/user');

router.post('/login', loginUser);
router.get('/getUsers', auth.authenticateToken, roleCheck.checkRole, getUsers);
router.post('/createUser', createUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUser/:id', getUser);
router.get('/checkToken', checkToken);
router.post('/getUserByDepartmentId', getUserByDepartmentId);
router.get('/getUsersByDepartment', getUsersByDepartment);

module.exports = router ;