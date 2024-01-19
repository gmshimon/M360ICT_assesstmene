import { NextFunction, Request, Response } from 'express'
import album_artistQueries from './album_artist.queries'
import pool from '../../../db/db'

const checkAlbumArtist = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { album_id, artist_id } = req.body
    pool.query(
      album_artistQueries.checkAlbumArtistExistQuery,
      [album_id, artist_id],
      (error, result) => {
        if (error) {
          return res.status(500).json({
            status: 'fail',
            message: error
          })
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
export default {
  checkAlbumArtist
}
