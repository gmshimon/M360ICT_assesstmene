import express, { NextFunction, Request, Response } from 'express'

const register = (req:Request,res:Response,next:NextFunction) =>{
    try {
        const userData = req.body;
        console.log(userData)

        res.status(200).json({
            status:"success",
            message:"User registered successfully",
            data:userData
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error
            
        })
    }
}

export default {register}