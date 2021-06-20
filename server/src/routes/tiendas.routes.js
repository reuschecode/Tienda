import { Router } from 'express'
const router = Router()

import * as tiendaController from '../controllers/tiendas.controller'
import { authJwt } from '../middlewares'


router.get('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], tiendaController.getTiendas)

router.post('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], tiendaController.createTiendaByEmpresaId)

router.get('/:tiendaId', tiendaController.getTiendasByEmpresaId)

router.get('/byName/:nombreTienda', tiendaController.getTiendasByNombre)

router.put('/:tiendaId', tiendaController.updateTiendaById)

router.put('/disable/:tiendaId', tiendaController.disableTiendaById)

router.put('/enable/:tiendaId', tiendaController.enableTiendayId)

export default router;