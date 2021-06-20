import { Router } from 'express'
const router = Router()

import * as userController from '../controllers/usuarios.controller'
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.permisoCrearUsuario], userController.createUsuario)
router.get('/', [authJwt.verifyToken], userController.getUsuario)

export default router;