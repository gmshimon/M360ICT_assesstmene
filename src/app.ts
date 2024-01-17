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
import AlbumArtistRouter from './Modules/Albums_Artist/albums_artist.route'

// Routes of the modules
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/albums',AlbumArtistRouter)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

export default app
