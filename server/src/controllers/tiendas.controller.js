import db from '../database'

export const getTiendas = async(req, res) => {
    await db.query('SELECT * FROM tienda', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener las tiendas." });
        }
    })
}

export const createTiendaByEmpresaId = async(req, res) => {
    const { nombre_tienda, direccion_tienda, departamento_tienda, provincia_tienda, distrito_tienda, id_empresa_fk, url_imagen } = req.body;
    const query = "INSERT INTO tienda(nombre_tienda, direccion_tienda, departamento_tienda, provincia_tienda, distrito_tienda, id_empresa_fk, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?);";
    await db.query(query, [nombre_tienda, direccion_tienda, departamento_tienda, provincia_tienda, distrito_tienda, id_empresa_fk, url_imagen], (err, rows, fields) => {
        if (!err) {
            res.json({
                message: 'Se creó la tienda correctamente.',
                status: "OK"
            });
        } else {
            console.log(err);
            res.json({
                message: "Ocurrió un error al crear la tienda.",
                error: err.sqlMessage,
                status: "ERROR"
            });
        }
    })
}

export const getTiendasByEmpresaId = async(req, res) => {
    const { tiendaId } = req.params;
    const query = "SELECT * FROM tienda WHERE id_empresa_fk = ?;";
    await db.query(query, [tiendaId], (err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) {
                res.json({ status: "NOT_FOUND", message: "No se encontraron tiendas para esta empresa." });
            } else {
                res.json(rows)
            }
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al buscar las tiendas."
            });
        }
    });
}

export const getTiendasByNombre = async(req, res) => {
    const { nombreTienda } = req.params;
    const { id_empresa_fk } = req.body;
    const query = "SELECT * FROM tienda WHERE id_empresa_fk = ? AND nombre_tienda LIKE '%" + nombreTienda + "%'";
    await db.query(query, [id_empresa_fk], (err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) {
                res.json({ status: "NOT_FOUND", message: "No se encontraron tiendas con esos nombres" });
            } else {
                res.json(rows)
            }
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al buscar las tiendas."
            });
        }
    });
}

export const updateTiendaById = async(req, res) => {
    const { tiendaId } = req.params;
    const { nombre_tienda, direccion_tienda, departamento_tienda, provincia_tienda, distrito_tienda, id_empresa_fk, url_imagen } = req.body;
    const query = "UPDATE tienda SET nombre_tienda = ?, direccion_tienda = ?, departamento_tienda = ?, provincia_tienda = ?, distrito_tienda = ?, id_empresa_fk = ?, url_imagen = ? WHERE idtienda = ?;";
    await db.query(query, [nombre_tienda, direccion_tienda, departamento_tienda, provincia_tienda, distrito_tienda, id_empresa_fk, url_imagen, tiendaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se actualizó la tienda.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar las tienda."
            });
        }
    })
}

export const disableTiendaById = async(req, res) => {
    const { tiendaId } = req.params;
    const query = "UPDATE tienda SET activo = b'0' WHERE idtienda = ?;";
    await db.query(query, [tiendaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se deshabilitó la tienda.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar la tienda."
            });
        }
    })
}

export const enableTiendayId = async(req, res) => {
    const { tiendaId } = req.params;
    const query = "UPDATE tienda SET activo = b'1' WHERE idtienda = ?;";
    await db.query(query, [tiendaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se habilitó la tienda.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar la tienda."
            });
        }
    })
}