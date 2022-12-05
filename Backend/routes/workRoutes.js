const express = require('express');
const router = express.Router();

const{ 
     getWorks,
     createWork,
     updateWork,
     deleteWork,
     getWork
} = require('../controllers/works');

router.get('/getWorks', getWorks);
router.post('/createWork', createWork);
router.patch('/updateWork/:id', updateWork);
router.delete('/deleteWork/:id', deleteWork);
router.get('/getWork/:id', getWork);

module.exports = router ;