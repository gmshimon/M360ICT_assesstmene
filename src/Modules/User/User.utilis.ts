import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { IUser } from './User.interface';
import { validationResult } from 'express-validator';

const passHash = (req: express.Request, res: express.Response,next:NextFunction) => {
    const userData = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    if(!userData.email || !userData.pass){
        return res.status(403).json({
            status:'Failed',
            message:"Email and password are required"
        })
    }
    bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(userData.pass,salt,(err,hash)=>{
        if(!err){
            userData.pass = hash;
            req.body = userData;
            next()

        }
        if(err) return res.status(500).json({
            status:"Failed",
            message:err
        })
       }) 
    })
}

export default {passHash}