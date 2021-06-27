import db from '../database'

export const createProducto = async(req, res) => {
    const { nombre, precio, color, marca, stock} = req.body;
    const url_imagen = req.file ? req.file.filename : null
    const query = "INSERT INTO producto(nombre, precio, color, marca, url_imagen, stock, id_tienda_fk) VALUES (?, ?, ?, ?, ?, ?, ?);";
    await db.query(query, [nombre, precio, color, marca, url_imagen, stock, req.userIdTienda], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se guardó al producto.' });
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al ingresar producto." });
        }
    })
} 

export const getProductos = async(req, res) => {
    await db.query('SELECT * FROM producto where id_tienda_fk = ? and activo = 1 ORDER BY idproducto DESC',[req.userIdTienda], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener productos." });
        }
    })
}

export const getProductoById = async(req, res) => {
    const { productoId } = req.params;
    await db.query('SELECT * FROM producto WHERE idproducto = ? AND activo = 1', [productoId], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener producto." });
        }
    });
}

export const updateProductoById = async(req, res) => {
    const { nombre, precio, color, marca, url_imagen, stock } = req.body;
    const url_Imagen = req.file ? req.file.filename : url_imagen ? url_imagen : null
    const { productoId } = req.params;
    const query = "UPDATE producto SET nombre = ?, precio = ?, color = ?, marca = ?, url_imagen = ?, stock = ? WHERE idproducto = ?;";
    await db.query(query, [nombre, precio, color, marca, url_Imagen, stock, productoId], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se actualizó al producto.' });
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al actualizar producto." });
        }
    })
}

export const deleteProductoById = async(req, res) => {
    const { productoId } = req.params;
    await db.query("UPDATE producto SET activo = b'0' WHERE idproducto = ?", [productoId], (err, rows, fields) => {
        if (!err) {
            res.json({status: "OK"})
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener producto." });
        }
    });
}