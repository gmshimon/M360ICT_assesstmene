import { NextFunction, Request, Response } from 'express'
import pool from '../../db/db'
import albumArtistQueries from './albums_artist.queries'
import userQueries from '../User/User.queries'

const internalErrorMessage = (response: any) => {
  return response.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
}

const createAlbum = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, title, release_year, genre } = req.body
    if (!title || !release_year || !genre) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide Title, release Year and genre'
      })
    }
    pool.query(userQueries.loginUserQuery, [user?.email], (error, results) => {
      if (error) {
        return internalErrorMessage(res)
      }
      pool.query(
        albumArtistQueries.createAlbumQuery,
        [title, release_year, genre, results.rows[0].id],
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

const getAlbum = (req: Request, res: Response, next: NextFunction) => {
  try {
    pool.query(albumArtistQueries.getAlbumQuery, (error, results) => {
      if (error) {
        return internalErrorMessage(res)
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

export default {
  createAlbum,
  getAlbum
}
