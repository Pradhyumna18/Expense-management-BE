const signup=require('../controller/UserController/signup')
const signin=require('../controller/UserController/signin')
const express=require('express')
const routes=express.Router();
routes.post('/signup',signup)
routes.post('/signin',signin)
module.exports=routes;