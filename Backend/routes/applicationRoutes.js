const express=require('express');
const {isAuthenticated} =require('../middlewares/authentication');
const { applyJob, getAppliedJob, getApplicants, updateStatus } = require('../controllers/applicationController');
const router=express.Router();

router.post('/status/:id/update',isAuthenticated,updateStatus);
router.get('/apply/:id',isAuthenticated,applyJob);
router.get('/get',isAuthenticated,getAppliedJob);
router.get('/:id/applicants',isAuthenticated,getApplicants);


module.exports= router;