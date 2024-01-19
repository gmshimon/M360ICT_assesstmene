import { NextFunction, Request, Response } from 'express'
import album_artistQueries from './album_artist.queries'
import pool from '../../../db/db'
import albumsQueries from '../Album/albums.queries'
import artistQueries from '../Artist/artist.queries'

const internalErrorMessage = (response: any, error: any) => {
  return response.status(500).json({
    status: 'fail',
    message: error
  })
}

const checkAlbumArtist = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { album_id, artist_id } = req.body
    pool.query(
      album_artistQueries.checkAlbumArtistExistQuery,
      [album_id, artist_id],
      (error, result) => {
        if (error) {
          return internalErrorMessage(res, error)
        }
        if (result.rows.length > 0) {
          return res.status(400).json({
            status: 'Fail',
            message: 'This library exists'
          })
        }
        next()
      }
    )
  } catch (error: any) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

const checkAlbum = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { album_id, artist_id } = req.body
    pool.query(albumsQueries.getAlbumQueryID, [album_id], (error, result) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      if (result.rows.length <= 0) {
        return res.status(404).json({
          status: 'Failed',
          message: 'No Album found'
        })
      }
      next()
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const checkArtist = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { album_id, artist_id } = req.body
      pool.query(artistQueries.getArtistQueryID, [album_id], (error, result) => {
        if (error) {
          return internalErrorMessage(res, error)
        }
        if (result.rows.length <= 0) {
          return res.status(404).json({
            status: 'Failed',
            message: 'No Artist found'
          })
        }
        next()
      })
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: error
      })
    }
  }

export default {
  checkAlbumArtist,
  checkAlbum,
  checkArtist
}
