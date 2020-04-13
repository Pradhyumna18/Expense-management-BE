const signup=require('../controller/UserController/signup')
const signin=require('../controller/UserController/signin')
const addAccount=require('../controller/AccountController/addAccount')
const getAccountsByUserId=require('../controller/AccountController/getAccountsByUserId')
const getAccountBalance=require('../controller/AccountController/getAccountBalance')
const express=require('express')
const routes=express.Router();
routes.post('/signup',signup)
routes.post('/signin',signin)
routes.post('/addAccount',addAccount)
routes.get('/getAccountsByUserId',getAccountsByUserId)
routes.get('/getAccountBalance',getAccountBalance)
module.exports=routes;