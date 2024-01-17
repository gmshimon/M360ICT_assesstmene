import { NextFunction, Request, Response } from 'express'
import pool from '../../../db/db'
import UserQueries from '../../User/User.queries'
import artistQueries from './artist.queries'

const internalErrorMessage = (response: any) => {
  return response.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
}

const createArtist = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user,name } = req.body
      if (!name) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Please provide artist name'
        })
      }
      pool.query(UserQueries.loginUserQuery, [user?.email], (error, results) => {
        if (error) {
          return internalErrorMessage(res)
        }
        pool.query(
            artistQueries.createAlbumQuery,
          [name, results.rows[0].id],
          (error, result) => {
            if (error) {
              return internalErrorMessage(res)
            }
            res.status(200).json({
              status: 'success',
              message: 'Album successfully created'
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
export default {
    createArtist
}