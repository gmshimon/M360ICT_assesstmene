import { NextFunction, Request, Response } from 'express'
import pool from '../../../db/db'
import artistQueries from '../Artist/artist.queries'
import albumsQueries from '../Album/albums.queries'
import album_artistQueries from './album_artist.queries'

const internalErrorMessage = (response: any, error: any) => {
  return response.status(500).json({
    status: 'fail',
    message: error
  })
}

const createLibrary = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { album_id, artist_id } = req.body
    if (!album_id || !artist_id) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Please provide a valid album and artist'
      })
    }
    pool.query(
      album_artistQueries.createAlbumArtistQuery,
      [album_id, artist_id],
      (error, result) => {
        if (error) {
          return internalErrorMessage(res, error)
        }
        res.status(200).json({
          status: 'success',
          message: 'Library successfully created'
        })
      }
    )
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  }
}

const getAlbumArtist = (req: Request, res: Response, next: NextFunction) => {
  try {
    pool.query(album_artistQueries.getAlbumArtistQuery, (error, result) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      res.status(200).json({
        status: 'success',
        message: result.rows
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
  createLibrary,
  getAlbumArtist
}
