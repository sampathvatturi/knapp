const express = require('express');
const router = express.Router();

const{ 
    getDepartment,
    createdepartment,
    updateDepartment,
    deleteDepartment,
    getDepartments
} = require('../controllers/departments');

router.get('/getDepts',getDepartments);
router.post('/createDept',createdepartment);
router.patch('/updateDept/:id',updateDepartment);
router.delete('/deleteDept/:id',deleteDepartment);
router.get('/getDept/:id',getDepartment);

module.exports = router ;