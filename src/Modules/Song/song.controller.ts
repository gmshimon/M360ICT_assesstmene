import { NextFunction, Request, Response } from 'express'
import pool from '../../db/db'
import UserQueries from '../User/User.queries'
import albumsQueries from '../Albums_Artist/Album/albums.queries'
import songQueries from './song.queries'

const internalErrorMessage = (response: any, error: any) => {
  return response.status(500).json({
    status: 'fail',
    message: error
  })
}
const createSong = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, title, duration, album_id } = req.body
    if (!title || !album_id || !duration) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide song title , duration and album details'
      })
    }
    pool.query(UserQueries.loginUserQuery, [user?.email], (error, result) => {
      if (error) {
        return internalErrorMessage(res, error)
      }
      pool.query(
        albumsQueries.getAlbumQueryID,
        [album_id],
        (error, results) => {
          if (error) {
            return internalErrorMessage(res, error)
          }
          if (results.rows.length <= 0) {
            return res.status(404).json({
              status: 'Failed',
              message: 'No Album found'
            })
          }
          pool.query(
            songQueries.createSongQuery,
            [title, duration, result.rows[0].id, album_id],
            (error, result) => {
              if (error) {
                return internalErrorMessage(res, error)
              }
              res.status(200).json({
                status: 'success',
                message: 'Song successfully created'
              })
            }
          )
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

const getSongs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { album_id } = req.query
    console.log(`${songQueries.getSongQuery} ${album_id && ` WHERE songs.album_id = ${album_id}`}`)
    pool.query(`${songQueries.getSongQuery} ${album_id ? ` WHERE songs.album_id = ${album_id}`:''}` , (error, results) => {
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

export default {
  createSong,
  getSongs
}
