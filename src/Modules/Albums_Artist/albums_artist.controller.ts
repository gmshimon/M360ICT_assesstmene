import { NextFunction, Request, Response } from 'express'
import pool from '../../db/db'
import albumArtistQueries from './albums_artist.queries'

const internalErrorMessage = (response: any) => {
  return response.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
}

const createAlbum = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user,title,release_year,genre} = req.body
    if(!title || !release_year || !genre){
        return res.status(400).json({
            status:"Failed",
            message:"Please provide Title, release Year and genre"
        })
    }
    pool.query(albumArtistQueries.createAlbumQuery,[title,release_year,genre],(error,result)=>{
        if (error){
            return internalErrorMessage(res)
        }
        res.status(200).json({
            status:"success",
            message:"Album successfully created"
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
    createAlbum
}