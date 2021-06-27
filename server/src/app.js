import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import rutasProductos from './routes/productos.routes'
import rutasAuth from './routes/auth.routes'
import rutasUsuario from './routes/usuarios.routes'
import rutasEmpresa from './routes/empresas.routes'
import rutasTienda from './routes/tiendas.routes'
import { initialSetup } from './libs/initialSetup'

const app = express();

//configuracion 
initialSetup();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static('public'))
app.use(cors());
app.set('port', process.env.PORT || 3001);

//rutas
app.get('/', (req, res) => {
    res.json("bienvenido");
})

app.use('/api/productos', rutasProductos)
app.use('/api/auth', rutasAuth)
app.use('/api/usuario', rutasUsuario)
app.use('/api/empresas', rutasEmpresa)
app.use('/api/tiendas', rutasTienda)

export default app;