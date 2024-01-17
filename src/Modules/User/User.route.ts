import express from 'express';
import authController from  './User.controller'
import UserUtilis from './User.utilis';

const router = express.Router();

router.post('/register',UserUtilis.passHash,authController.register)
router.post('/login',authController.login)

export default router