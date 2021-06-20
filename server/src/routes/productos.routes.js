import {Router} from 'express'
const router = Router()

import * as productoController from '../controllers/productos.controller'
import {authJwt} from '../middlewares'

router.get('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], productoController.getProductos)

router.post('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], productoController.createProducto)

router.get('/:productoId', productoController.getProductoById)

router.put('/:productoId', productoController.updateProductoById)

router.delete('/:productoId', productoController.deleteProductoById)

export default router;