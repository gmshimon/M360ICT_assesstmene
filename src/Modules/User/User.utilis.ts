import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { IUser } from './User.interface';

const passHash = (req: express.Request, res: express.Response,next:NextFunction) => {
    const userData = req.body;

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