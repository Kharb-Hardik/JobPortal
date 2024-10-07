const express=require('express');
const {login,register,updateProfile, logout}=require('../controllers/userController');
const {isAuthenticated} =require('../middlewares/authentication');
const { Model } = require('mongoose');
const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/profile/update',isAuthenticated,updateProfile);


module.exports= router;