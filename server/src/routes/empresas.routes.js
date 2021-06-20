import { Router } from 'express'
const router = Router()

import * as empresaController from '../controllers/empresas.controller'
import { authJwt } from '../middlewares'


router.get('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], empresaController.getEmpresas)

router.post('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], empresaController.createEmpresa)

router.get('/:nombreEmpresa', empresaController.getEmpresaByNombre)

router.put('/:empresaId', empresaController.updateEmpresaById)

router.put('/disable/:empresaId', empresaController.disableEmpresaById)

router.put('/enable/:empresaId', empresaController.enableEmpresaById)

export default router;