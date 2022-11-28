const express = require('express');
const router = express.Router();

const{ 
    getdepartments,
    postdepartments,
    updatedepartments,
    deletedepartments
} = require('../controllers/departments');

router.get('/dept',getdepartments);
router.get('/insertdept',postdepartments);
router.get('/updatedept',updatedepartments);
router.get('/deletedept',deletedepartments);

module.exports = router ;