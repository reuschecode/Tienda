import db from '../database'
import jwt from 'jsonwebtoken'
import config from '../config'

export const createUsuario = async(req, res) => {

}

export const getUsuario = async(req, res) => {
    const token = req.headers["x-access-token"]

    if (!token) return res.status(403).json({ message: "No se envió un token." });

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id
    await db.query("SELECT idusuario, email, password, idtienda, nombre_tienda, url_imagen, nombres, apellidos, usuario.activo FROM usuario, tienda WHERE idusuario = ?;", [req.userId], (err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) return res.status(404).json({ message: "No se encontró al usuario" });
            rows[0].password = 0;
            if (!rows[0].activo) return res.status(401).json({ message: "Usuario desabilitado por administrador." });
            res.json({
                user: {
                    idusuario: rows[0].idusuario,
                    email: rows[0].email,
                    idtienda: rows[0].idtienda,
                    nombres: rows[0].nombres,
                    apellidos: rows[0].apellidos,
                    nombretienda: rows[0].nombre_tienda,
                    url_imagen: rows[0].url_imagen,
                    activo: rows[0].activo
                }
            })
        } else {
            console.log(err);
            res.json({
                error: err.sqlMessage,
                code: err.code,
                message: "Ocurrió un error desconocido al intentar encontrar al usuario."
            });
        }
    })
}

export const getUsuariosByTienda = async(req, res) => {

}

export const getUsuarios = async(req, res) => {

}