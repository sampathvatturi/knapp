const express = require('express');
const router = express.Router();

const{ 
    getdepartments,
    postdepartments,
    updatedepartments,
    deletedepartments
} = require('../controllers/departments');

router.get('/dept',getdepartments);
router.post('/dept',postdepartments);
router.patch('/dept/:id',updatedepartments);
router.delete('/dept/:id',deletedepartments);

module.exports = router ;