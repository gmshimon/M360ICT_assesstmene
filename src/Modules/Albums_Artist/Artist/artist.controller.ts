import { NextFunction, Request, Response } from 'express'
import pool from '../../../db/db'
import UserQueries from '../../User/User.queries'
import artistQueries from './artist.queries'

const internalErrorMessage = (response: any, error: any) => {
  return response.status(500).json({
    status: 'fail',
    message: error
  })
}

const createArtist = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, name } = req.body
    if (!name) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide artist name'
      })
    }
    pool.query(UserQueries.loginUserQuery, [user?.email], (error, results) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      pool.query(
        artistQueries.createAlbumQuery,
        [name, results.rows[0].id],
        (error, result) => {
          if (error) {
            return internalErrorMessage(res, error)
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

const getArtist = (req: Request, res: Response, next: NextFunction) => {
  try {
    pool.query(artistQueries.getArtistQuery, (error, results) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      res.status(200).json({
        status: 'success',
        data: results.rows
      })
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const getAlbumByID = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    pool.query(artistQueries.getArtistQueryID, [id], (error, results) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      if (results.rows.length <= 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'No data found'
        })
      }
      res.status(200).json({
        status: 'success',
        data: results.rows[0]
      })
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const deleteArtistID = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      pool.query(artistQueries.getArtistQueryID, [id], (error, results) => {
        if (error) {
          return internalErrorMessage(res,error)
        }
        if (results.rows.length <= 0) {
          return res.status(404).json({
            status: 'Failed',
            message: 'No data found'
          })
        }
        pool.query(artistQueries.deleteArtistQuery, [id], (error) => {
          if (error) {
            return internalErrorMessage(res,error)
          }
          res.status(200).json({
            status: 'success',
            message: 'successfully deleted'
          })
        })
      })
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: error
      })
    }
  }
export default {
  createArtist,
  getArtist,
  getAlbumByID,
  deleteArtistID
}
