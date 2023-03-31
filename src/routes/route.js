const express = require('express');
const app = require('express')


const userController= require('../controllers/userController');
const auth = require('../middelwears/auth')




router.post('/registerUser',userController.createUser)


router.post('/login',userController.login)


router.get('/fetchUser',auth.authenticaiton,userController.getUser)


module.exports= router;











