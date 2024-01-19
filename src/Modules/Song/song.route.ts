import express from 'express';
import verifyLoginToken from '../../Middleware/verifyToken';
import songController from './song.controller'
const router = express.Router();

router.route('/create-song').post(verifyLoginToken,songController.createSong)
router.route('/get-song').get(verifyLoginToken,songController.getSongs)

export default router