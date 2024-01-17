import express from 'express';
import verifyLoginToken from '../../../Middleware/verifyToken';
import artistController from './artist.controller';
const router = express.Router();

router.route('/create-artist').post(verifyLoginToken,artistController.createArtist)
router.route('/get-artist').get(verifyLoginToken,artistController.getArtist)
router.route('/:id').get(verifyLoginToken,artistController.getAlbumByID)

export default router