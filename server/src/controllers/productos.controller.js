import db from '../database'

export const createProducto = async(req, res) => {
    const { nombre, precio, color, marca, url_imagen, stock} = req.body;
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
    await db.query('SELECT * FROM producto', (err, rows, fields) => {
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
    await db.query('SELECT * FROM producto WHERE idproducto = ?', [productoId], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al obtener producto." });
        }
    });
}

export const updateProductoById = async(req, res) => {
    const { nombre, precio, stock, url_imagen } = req.body;
    const { productoId } = req.params;
    const query = "UPDATE producto SET nombre = ?, precio = ?, stock = ?, url_imagen = ? WHERE idproducto = ?;";
    await db.query(query, [nombre, precio, stock, productoId, url_imagen], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Se actualizó al producto.' });
        } else {
            console.log(err);
            res.json({ error: "Ocurrió un error al actualizar producto." });
        }
    })
}

export const deleteProductoById = (req, res) => {

}