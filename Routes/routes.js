const signup=require('../controller/UserController/signup')
const signin=require('../controller/UserController/signin')

const signUpValidator=require('../validationMiddleware/signUpValidator')
const addAccountValidator=require('../validationMiddleware/addAccountValidator')
const addTransactionValidator=require('../validationMiddleware/addTransactionValidator')

const addAccount=require('../controller/AccountController/addAccount')
const getAccountsByUserId=require('../controller/AccountController/getAccountsByUserId')
const getAccountBalance=require('../controller/AccountController/getAccountBalance')
const getAccountNameById=require('../controller/AccountController/getAccountNameById')

const addTransaction=require('../controller/TransactionController/addTransaction')
const editTransaction=require('../controller/TransactionController/editTransaction')
const deleteTransaction=require('../controller/TransactionController/deleteTransaction')
const getTransactionsByAccountName=require('../controller/TransactionController/getTransactionsByAccountName')
const getTransactionById=require('../controller/TransactionController/getTransactionById')
const getTransactions=require('../controller/TransactionController/getTransactions')

const express=require('express')
const routes=express.Router();

routes.post('/signup',signUpValidator,signup)
routes.post('/signin',signin)

routes.post('/addAccount',addAccountValidator,addAccount)
routes.get('/getAccountsByUserId',getAccountsByUserId)
routes.get('/getAccountBalance/:accountName',getAccountBalance)
routes.get('/getAccountNameById/:accountId',getAccountNameById)

routes.post('/addTransaction',addTransactionValidator,addTransaction)
routes.put('/editTransaction',editTransaction)
routes.delete('/deleteTransaction/:transactionId',deleteTransaction)
routes.get('/getTransactionsByAccountName/:accountName',getTransactionsByAccountName)
routes.get('/getTransactionById/:transactionId',getTransactionById)
routes.get('/getTransactions',getTransactions)

module.exports=routes;

