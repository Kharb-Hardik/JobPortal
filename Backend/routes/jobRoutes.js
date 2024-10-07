const express=require('express');
const {isAuthenticated} =require('../middlewares/authentication');
const { postJob, getAllJob, getJobbyId, getAdminJobs } = require('../controllers/jobController');
const router=express.Router();

router.post('/post',isAuthenticated,postJob);
router.get('/get',isAuthenticated,getAllJob);
router.get('/get/:id',isAuthenticated,getJobbyId);
router.get('/getadminjob',isAuthenticated,getAdminJobs);


module.exports= router;