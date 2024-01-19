import { NextFunction, Request, Response } from 'express'
import pool from '../../db/db'
import userQueries from './User.queries'
import bcrypt from 'bcrypt'
import generateToken from '../../Middleware/generateToken'
import { validationResult } from 'express-validator'


const internalErrorMessage = (response: any) => {
  return response.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
}

const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    const { name, email, pass, age } = userData
    pool.query(userQueries.loginUserQuery, [email], (error, result) => {
      if (error) {
        return internalErrorMessage(res)
      }
      if (result.rows.length) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Email Already Exists'
        })
      }
      pool.query(
        userQueries.registerUserQuery,
        [name, email, pass, age],
        (error, results) => {
          if (error) {
            return internalErrorMessage(res)
          }
          res.status(200).json({
            status: 'success',
            message: 'Successfully registered'
          })
        }
      )
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
  
    if (!email || !password) {
      return res.status(403).json({
        status: 'Fail',
        message: 'Please provide credentials'
      })
    }
    // query to find the user
    pool.query(userQueries.loginUserQuery, [email], (error, result) => {
      if (error) {
        console.error(error)
        return res.status(500).json({
          status: 'fail',
          message: 'Internal Server Error'
        })
      }
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        })
      }

      // check if the hash password is correct
      const isPasswordValid: boolean = bcrypt.compareSync(
        password,
        result.rows[0].pass
      )
      if (!isPasswordValid) {
        return res.status(403).json({
          status: 'Fail',
          message: 'Wrong password'
        })
      }
      // generate token for logged in user
      const token = generateToken(result.rows[0])
      // excluding the  password
      const { pass, ...others } = result.rows[0]
      res.status(200).json({
        status: 'Success',
        message: 'User successfully logged in',
        data: others,
        token: token
      })
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

export default { register, login }
