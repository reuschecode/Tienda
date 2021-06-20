import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { authJwt } from '../middlewares'

router.post('/registrarse', [authJwt.verifyToken, authJwt.permisoCrearUsuario], authController.signUp)

router.post('/logearse', authController.signIn)

export default router;