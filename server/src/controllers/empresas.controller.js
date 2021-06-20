import db from '../database'

export const getEmpresas = async(req, res) => {
    await db.query('SELECT * FROM empresa', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener las empresas." });
        }
    })
}

export const createEmpresa = async(req, res) => {
    const { nombre_empresa, url_imagen, ruc } = req.body;
    const query = "INSERT INTO empresa(nombre_empresa, url_imagen, ruc) VALUES (?, ?, ?);";
    await db.query(query, [nombre_empresa, url_imagen, ruc], (err, rows, fields) => {
        if (!err) {
            res.json({
                message: 'Se creó la empresa correctamente.',
                status: "OK"
            });
        } else {
            console.log(err);
            res.json({
                message: "Ocurrió un error al crear la empresa.",
                error: err.sqlMessage,
                status: "ERROR"
            });
        }
    })
}

export const getEmpresaByNombre = async(req, res) => {
    const { nombreEmpresa } = req.params;
    const query = "SELECT * FROM empresa WHERE nombre_empresa LIKE '%" + nombreEmpresa + "%'";
    await db.query(query, (err, rows, fields) => {
        if (!err) {
            if (rows.length === 0) {
                res.json({ status: "NOT_FOUND", message: "No se encontraron empresas con esos nombres" });
            } else {
                res.json(rows)
            }
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al buscar las empresas."
            });
        }
    });
}

export const updateEmpresaById = async(req, res) => {
    const { nombre_empresa, url_imagen, ruc } = req.body;
    const { empresaId } = req.params;
    const query = "UPDATE empresa SET nombre_empresa = ?, url_imagen = ?, ruc = ? WHERE idempresa = ?;";
    await db.query(query, [nombre_empresa, url_imagen, ruc, empresaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se actualizó la empresa.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar la empresa."
            });
        }
    })
}

export const disableEmpresaById = async(req, res) => {
    const { empresaId } = req.params;
    const query = "UPDATE empresa SET activo = b'0' WHERE idempresa = ?;";
    await db.query(query, [empresaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se deshabilitó la empresa.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar la empresa."
            });
        }
    })
}

export const enableEmpresaById = async(req, res) => {
    const { empresaId } = req.params;
    const query = "UPDATE empresa SET activo = b'1' WHERE idempresa = ?;";
    await db.query(query, [empresaId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se habilitó la empresa.' });
        } else {
            console.log(err);
            res.json({
                status: "ERROR",
                error: err.sqlMessage,
                message: "Error al actualizar la empresa."
            });
        }
    })
}