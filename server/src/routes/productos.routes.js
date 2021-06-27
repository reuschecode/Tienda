import {Router} from 'express'
const router = Router()
import * as productoController from '../controllers/productos.controller'
import {authJwt} from '../middlewares'
import {upload} from '../middlewares/multer'

router.get('/', [authJwt.verifyToken, authJwt.permisoCrearProducto],  productoController.getProductos)

router.post('/', [authJwt.verifyToken, authJwt.permisoCrearProducto], upload.single('imagen'), productoController.createProducto)

router.get('/:productoId', productoController.getProductoById)

router.put('/:productoId', upload.single('imagen'), productoController.updateProductoById)

router.delete('/:productoId',[authJwt.verifyToken, authJwt.permisoCrearProducto], productoController.deleteProductoById)

export default router;