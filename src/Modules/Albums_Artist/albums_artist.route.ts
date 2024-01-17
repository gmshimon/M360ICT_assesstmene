import express from 'express';
import albumArtistController from  './albums_artist.controller'
import verifyLoginToken from '../../Middleware/verifyToken';
const router = express.Router();

router.route('/create-albums').post(verifyLoginToken,albumArtistController.createAlbum)

export default router