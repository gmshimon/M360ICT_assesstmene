import express from 'express';
import albumController from  './albums.controller'
import verifyLoginToken from '../../../Middleware/verifyToken';
const router = express.Router();

router.route('/create-albums').post(verifyLoginToken,albumController.createAlbum)
router.route('/get-albums').get(verifyLoginToken,albumController.getAlbum)
router.route('/get-albums/:id').get(verifyLoginToken,albumController.getAlbumByID)
router.route('/delete-albums/:id').delete(verifyLoginToken,albumController.deleteAlbumID)
router.route('/update-albums/:id').put(verifyLoginToken,albumController.updateAlbumID)

export default router