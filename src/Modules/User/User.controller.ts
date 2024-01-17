import express, { NextFunction, Request, Response } from 'express'
import pool from '../../db/db';

const register = (req:Request,res:Response,next:NextFunction) =>{
    try {
        const userData = req.body;
        // pool.query()
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

const login = (req:Request,res:Response,next:NextFunction) =>{
    try {
        pool.query("SELECT * FROM users",(error,result)=>{
            if(error)  throw error;
            // excluding the  password
            const {pass,...others} = result.rows[0];
            res.status(200).json({
                status:"Success",
                message:"User successfully logged in",
                data:others
            })
        })
    }catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error
            
        })
    }
}

export default {register,login}