import express from 'express';
import albumArtistController from  './albums_artist.controller'
import verifyLoginToken from '../../Middleware/verifyToken';
const router = express.Router();

router.route('/create-albums').post(verifyLoginToken,albumArtistController.createAlbum)
router.route('/get-albums').get(verifyLoginToken,albumArtistController.getAlbum)
router.route('/get-albums/:id').get(verifyLoginToken,albumArtistController.getAlbumByID)
router.route('/delete-albums/:id').delete(verifyLoginToken,albumArtistController.deleteAlbumID)
router.route('/update-albums/:id').put(verifyLoginToken,albumArtistController.updateAlbumID)

export default router