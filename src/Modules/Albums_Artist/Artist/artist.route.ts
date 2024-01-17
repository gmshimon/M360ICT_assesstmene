import express from 'express';
import verifyLoginToken from '../../../Middleware/verifyToken';
import artistController from './artist.controller';
const router = express.Router();

router.route('/create-artist').post(verifyLoginToken,artistController.createArtist)
router.route('/get-artist').get(verifyLoginToken,artistController.getArtist)
router.route('/get-artist/:id').get(verifyLoginToken,artistController.getAlbumByID)
router.route('/delete-artist/:id').delete(verifyLoginToken,artistController.deleteArtistID)
router.route('/update-artist/:id').put(verifyLoginToken,artistController.updateArtistID)

export default router