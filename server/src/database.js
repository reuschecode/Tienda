import mysql from 'mysql';
import {promisify} from 'util';
import {database} from './keys';

const db = mysql.createPool(database);

db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión a la base de datos fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conexión');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión se negó a conectarse');
        }
    }

    if(connection){
        connection.release();
        console.log("La base de datos está conectada");
    }

    return;
});

db.query = promisify(db.query);

module.exports = db;