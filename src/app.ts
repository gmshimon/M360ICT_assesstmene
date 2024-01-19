import express, { Application, NextFunction, Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
const app: Application = express()

dotenv.config()
app.use(cors())

//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

console.log(process.env.TOKEN_SECRET)

import UserRouter from './Modules/User/User.route'
import AlbumRouter from './Modules/Albums_Artist/Album/albums.route'
import ArtistRouter from './Modules/Albums_Artist/Artist/artist.route'
import SongRouter from './Modules/Song/song.route'

// Routes of the modules
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/albums',AlbumRouter)
app.use('/api/v1/artists',ArtistRouter)
app.use("/api/v1/songs",SongRouter)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

export default app
