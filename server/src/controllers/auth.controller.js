import db from '../database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async(req, res) => {
    const { email, password, dni, id_tienda } = req.body;
    let rol = req.body.rol;
    if (rol === undefined) rol = 'USUARIO';
    const query = "INSERT INTO usuario(email, password, dni, id_rol_fk, id_tienda_fk) VALUES (?, ?, ?, ?, ?);";
    const newPassword = await encryptPassword(password);
    await db.query(query, [email, newPassword, dni, rol, id_tienda], (err, rows, fields) => {
        if (!err) {
            const token = jwt.sign({ id: rows.insertId }, config.SECRET, {
                expiresIn: 57600 //16 horas
            })
            res.status(200).json({
                message: 'Se guardó al usuario.',
                token
            });
        } else {
            console.log(err);
            if (err.code === "ER_DUP_ENTRY") {
                res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Ya existe un usuario con ese email."
                })
            }
            if (err.code === "ER_BAD_NULL_ERROR") {
                res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Debe especificar todos los datos del formulario."
                })
            } else {
                res.json({
                    error: err.sqlMessage,
                    code: err.code,
                    message: "Ocurrió un error desconocido al intentar ingresar un usuario."
                });
            }
            return;
        }
    })
}

export const signIn = async(req, res) => {
    const query = "SELECT idusuario, email, password, idtienda, nombre_tienda, url_imagen, nombres, apellidos, usuario.activo FROM usuario, tienda WHERE email = ?";
    await db.query(query, [req.body.email], async(err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) return res.json({ message: "No existe un usuario con ese email.", status: "NOT_FOUND" });
            const matchPassword = await comparePassword(req.body.password, rows[0].password);
            if (!rows[0].activo) return res.json({ message: "Usuario desabilitado por administrador.", status: "DISABLED" });
            if (!matchPassword) return res.json({ token: null, message: 'Contraseña inválida.', status: "INVALID_PASSWORD" });
            else {
                const token = jwt.sign({ id: rows[0].idusuario }, config.SECRET, {
                    expiresIn: 57600
                })
                res.json({
                    message: "Usuario válido.",
                    user: {
                        idusuario: rows[0].idusuario,
                        email: rows[0].email,
                        idtienda: rows[0].idtienda,
                        nombres: rows[0].nombres,
                        apellidos: rows[0].apellidos,
                        nombretienda: rows[0].nombre_tienda,
                        url_imagen: rows[0].url_imagen,
                        activo: rows[0].activo
                    },
                    status: "OK",
                    token
                })
            }
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

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}