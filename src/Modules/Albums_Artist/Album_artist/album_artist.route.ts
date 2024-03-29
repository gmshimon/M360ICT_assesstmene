import express from 'express';
import verifyLoginToken from '../../../Middleware/verifyToken';
import album_artistController from './album_artist.controller'
import album_artistUtilis  from './album_artist.utilis'
const router = express.Router();

router.route('/create').post(verifyLoginToken,album_artistUtilis.checkAlbumArtist,album_artistUtilis.checkAlbum,album_artistUtilis.checkArtist, album_artistController.createLibrary)

router.route('/').get(verifyLoginToken,album_artistController.getAlbumArtist)

export default router