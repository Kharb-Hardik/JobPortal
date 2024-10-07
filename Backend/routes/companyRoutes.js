const express=require('express');
const {isAuthenticated} =require('../middlewares/authentication');
const { registerCompany, getCompany, getCompanybyId, updateCompany } = require('../controllers/companyController');
const router=express.Router();

router.post('/register',isAuthenticated,registerCompany);
router.get('/get',isAuthenticated,getCompany);
router.get('/get/:id',isAuthenticated,getCompanybyId);
router.put('/update/:id',isAuthenticated,updateCompany);


module.exports= router;