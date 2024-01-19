import express from 'express';
import authController from  './User.controller'
import UserUtilis from './User.utilis';
import { body,validationResult } from 'express-validator'

const router = express.Router();

const validateRequestForRegistration = [
   body('name').notEmpty().withMessage("Name must be provided"),
   body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
   body('pass').notEmpty().withMessage('Password must be provided'),
   body('age').notEmpty().withMessage('Age must be provided').isInt().withMessage('Age must be number')
]

const validateRequestForLogin = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password must be provided')
]

router.post('/register',validateRequestForRegistration,UserUtilis.passHash,authController.register)
router.post('/login',validateRequestForLogin,authController.login)

export default router


/* "name":"GM SHimon",
"email":"simonrosedale059@gmail.com",
"pass":"#Shimon9696", */