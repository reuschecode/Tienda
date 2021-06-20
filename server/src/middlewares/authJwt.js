import jwt, { decode } from 'jsonwebtoken'
import config from '../config'
import db from '../database'

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(403).json({ message: "No se envió un token." });

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        await db.query("SELECT * FROM usuario WHERE idusuario = ?", [req.userId], (err, rows, fields) => {
            if (!err) {
                if (rows.length === 0) return res.status(404).json({ message: "No se encontró al usuario" });
                rows[0].password = 0;
                if (!rows[0].activo) return res.status(401).json({ message: "Usuario desabilitado por administrador." });
                req.userIdTienda = rows[0].id_tienda_fk;
                next();
            } else {
                console.log(err);
                res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Ocurrió un error desconocido al intentar encontrar al usuario."
                });
            }
        })
        next()
    } catch (err) {
        return res.status(401).json({ message: "Tiempo de usuario expirado, vuelve a logearte." })
    }
}

export const permisoCrearProducto = async(req, res, next) => {
    const query = "SELECT nombre_permiso FROM usuario, rol, permiso, rol_permiso WHERE usuario.idusuario = ? and usuario.id_rol_fk = rol.idrol and rol.idrol = rol_permiso.rol_id and rol_permiso.permiso_id = permiso.idpermiso;";
    
    await db.query(query, [req.userId], async(err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) return res.status(404).json({ message: "El Rol no tiene permisos" });
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].nombre_permiso === "CREAR_PRODUCTO") {
                    next();
                    return;
                }
            }
            return res.status(403).json({ message: "Se requiere el permiso de crear producto" });
        } else {
            console.log(err);
            return res.json({ message: "ERROR" })
        }
    })
}

export const permisoCrearUsuario = async(req, res, next) => {
    const query = "SELECT nombre_permiso FROM usuario, rol, permiso, rol_permiso WHERE usuario.idusuario = ? and usuario.id_rol_fk = rol.idrol and rol.idrol = rol_permiso.rol_id and rol_permiso.permiso_id = permiso.idpermiso;";

    await db.query(query, [req.userId], async(err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) return res.status(404).json({ message: "El Rol no tiene permisos" });
            let permisos = [];
            const queryPermisos = "SELECT nombre_permiso FROM rol_permiso, permiso WHERE rol_permiso.rol_id = ? AND rol_permiso.permiso_id = permiso.idpermiso;";
            await db.query(queryPermisos, [rows[0].idrol], (err, rows, fields) => {
                if (!err) {
                    console.log(rows)
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].nombre_permiso === "CREAR_USUARIO") {
                            next();
                            return;
                        }
                    }
                    return res.status(403).json({ message: "Se requiere el permiso de crear usuario" });
                } else {
                    console.log(err);
                    res.json({ message: "ERROR" });
                }
            })
        } else {
            return res.json({ message: "ERROR" })
        }
    })
}